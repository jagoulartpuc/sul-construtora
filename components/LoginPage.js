import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '80%',
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});

const users = [
    { id: 'admin', password: 'password1' },
    { id: 'user1', password: 'password1' },
    { id: 'user2', password: 'password2' },
];

function LoginPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const handleLogin = () => {
        const user = users.find(u => u.id === id);

        if (!user) {
            setError('Invalid ID');
            return;
        }

        if (user.password !== password) {
            setError('Incorrect password');
            return;
        }

        setError('');
        AsyncStorage.setItem('id', id);
        AsyncStorage.setItem('password', password);
        console.log('Logged in successfully');
        if(user.id == 'admin') {
            navigation.navigate('Categorias');
        } else {
            navigation.navigate('Rotas');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="ID"
                value={id}
                onChangeText={text => setId(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button title="Login" onPress={handleLogin} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

export default LoginPage;
