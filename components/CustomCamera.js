import { View, Button } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import {FontAwesome} from '@expo/vector-icons/'

function CustomCamera() {
    const [hasPermission, setHasPermission] = useState(null);
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

    async function takePicture() {
        if (camRef) {
            await camRef.current.takePictureAsync();
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