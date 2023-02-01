import { View, Button, TextInput, Modal, Text } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

function CustomCamera({ route }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = useState('');
    const [date, setDate] = useState('');
    const [token, setToken] = useState('');
    const [imageName, setImageName] = useState('');
    const { room } = route.params;
    const camRef = useRef();
    const navigation = useNavigation();

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

    const handleDateChange = (dateText) => {
        let formattedDate = '';
    
        if (dateText.length === 2 || dateText.length === 5) {
          formattedDate = `${dateText}/`;
        } else {
          formattedDate = dateText;
        }
    
        setDate(formattedDate);
      };

    const updateObject = async (imageName, token, text, date) => {
        const url = 'https://sul-construtora-default-rtdb.firebaseio.com/funcionarios.json';
        const id = await (AsyncStorage.getItem('id'));
        const responseCat = await fetch(url);
        const employees = await responseCat.json();
        console.log('catet', employees);
        const newPhoto = {
            id: imageName,
            description: text,
            date: date,
            content: "https://firebasestorage.googleapis.com/v0/b/sul-construtora.appspot.com/o/" + imageName + "?alt=media&token=" + token
        }
        const roomId = room.id;
        let newEmployees = () => {
            let employee = employees.find(emp => emp.id === id);
            if (employee) {
                employee.buildings.forEach(build => {
                    let room = build.rooms.find(room => room.id === roomId);
                    if (room) {
                        room.services.push(newPhoto);
                    }
                });
            }
            return emp;
        };
        const headers = { "Content-Type": "application/json" };
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(newEmployees()),
            headers: headers
        })
            .then(res => res.json())
            .then(json => console.log("RESPONSEEE", json))
            .catch(error => console.error(error));
        setModalVisible(false);
        navigation.navigate('Fotos', { room: room })
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
                setToken(json.downloadTokens);
                setImageName(imageName);
                setModalVisible(true);
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
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text> Escreva o que foi feito: </Text>
                        <TextInput
                            style={{
                                height: 40,
                                margin: 12,
                                borderWidth: 1,
                                padding: 10
                            }}
                            onChangeText={onChangeText}
                            value={text}
                        />
                        <Text> Selecione a data do serviço: </Text>
                        <TextInput
                            keyboardType='numeric'
                            style={{
                                height: 40,
                                margin: 12,
                                borderWidth: 1,
                                padding: 10
                            }}
                            onChangeText={(dateText) => handleDateChange(dateText)}
                            value={date}
                        />
                        <Button title="Continuar" onPress={() => updateObject(imageName, token, text, date)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default CustomCamera;