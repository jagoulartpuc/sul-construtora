import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import Service from './Service'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatListContainer: {
        alignSelf: 'center',
        width: '80%',
        marginBottom: 100
    },
    plusButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,

    },
    tableText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20
    },
    filterIconContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    filterText: {
        color: 'white',
        fontSize: 16,
        marginRight: 10
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    }
});

function getAllRooms(employees) {
    let rooms = [];
    for (const employee of employees.filter(emp => !emp.isAdmin)) {
        for (const building of employee.buildings) {
            rooms = rooms.concat(building.rooms);
        }
    }

    return rooms;
}

function ServicesScreen({ route }) {
    const [services, setServices] = useState([]);
    const { room } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://sul-construtora-default-rtdb.firebaseio.com/funcionarios.json');
                const data = await response.json();
                setServices(getAllRooms(data).find(rm => rm.id === room.id).services);
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

    return (
        <View style={styles.container}>
            <View style={styles.flatListContainer}>
                <FlatList
                    data={services}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <Service item={item} />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            <TouchableOpacity
                style={[styles.buttonContainer, { backgroundColor: '#0077C9', borderRadius: 10 }]}
                onPress={() => { setModalVisible(true) }}
            >
                <View style={styles.filterIconContainer}>
                    <Text style={styles.filterText}>Filtrar</Text>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text> Data: </Text>
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
                        <Text> Tipo do serviço: </Text>
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
                        <Button title="Continuar" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ServicesScreen;
