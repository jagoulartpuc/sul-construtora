import { View, Button } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage'

function CustomCamera({ route }) {
    const [hasPermission, setHasPermission] = useState(null);
    const { room } = route.params;
    const camRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { status } = await Camera.requestCameraPermissionsAsync();
                setHasPermission(status === 'granted')
                console.log(status)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const updateObject = async (imageName, json) => {
        const url = 'https://sul-construtora-default-rtdb.firebaseio.com/categories.json';
        const id = await (AsyncStorage.getItem('id'));
        const responseCat = await fetch(url);
        const categories = await responseCat.json();
        console.log('catet', categories)
        const newPhoto = {
            id: imageName,
            description: "fdsfsd",
            date: new Date().toLocaleDateString(),
            content: "https://firebasestorage.googleapis.com/v0/b/sul-construtora.appspot.com/o/" + imageName + "?alt=media&token=" + json.downloadTokens
        }
        const roomId = room.id;
        let newCategories = categories.map(cat => {
            let employee = cat.employees.find(emp => emp.id === id);
            if (employee) {
                employee.buildings.forEach(build => {
                    let room = build.rooms.find(room => room.id === roomId);
                    if (room) {
                        room.photo.push(newPhoto);
                    }
                });
            }
            return cat;
        });
        const headers = { "Content-Type": "application/json" };
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(newCategories),
            headers: headers
          })
            .then(res => res.json())
            .then(json => console.log("RESPONSEEE", json))
            .catch(error => console.error(error));
    }    

    async function takePicture() {
        try {
            if (camRef) {
                const picture = await camRef.current.takePictureAsync();
                console.log(picture)
                const filePath = picture.uri
                const imageName = filePath.substr(filePath.lastIndexOf("Camera/") + "Camera/".length);
                const url = "https://firebasestorage.googleapis.com/v0/b/sul-construtora.appspot.com/o?name=" + imageName;
                const headers = {
                    "Content-Type": "image/jpeg"
                };

                const response = await fetch(picture.uri);
                const blob = await response.blob();

                const res = await fetch(url, {
                    method: "POST",
                    body: blob,
                    headers: headers
                });

                const json = await res.json();
                console.log(json)
                updateObject(imageName, json);
                return json;
            }
        } catch (error) {
            console.error(error);
        }
    }


    if (hasPermission === false) {
        return <Text>Acesso negado</Text>
    }
    return (
        <View>
            <Camera
                type={Camera.Constants.Type.fron}
                style={{ height: 600 }}
                ref={camRef}
            />
            <Button title="Tirar Foto" onPress={takePicture} />
        </View>
    );
}

export default CustomCamera;