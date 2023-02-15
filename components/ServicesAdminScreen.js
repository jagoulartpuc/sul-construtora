import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import Service from './Service'
import { SelectList } from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        position: 'relative',
        bottom: 150,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        paddingHorizontal: 20
    },
    flatListContainer: {
        top: 20,
        alignSelf: 'center',
        width: '80%',
        marginBottom: 180
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
        position: 'relative',
        top: 0,
        margin: 5,
        bottom: 10,
        left: 0,
        right: 0,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
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

const serviceTypes = ["Corretiva", "Preventiva"];

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
    const { room, employee } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState('');
    const [selected, setSelected] = useState('');
    const [modalVisible2, setModalVisible2] = useState(false);
    const [task, setTask] = useState('');
    const [selected2, setSelected2] = useState("");
    const navigation = useNavigation();
    const [employeeNull, setEmployeeNull] = useState(false);

    function filterServices(selected, date) {
        let newServices = []
        if (date === '') {
            newServices = services.filter(ser => ser.type.toUpperCase() === selected.toUpperCase())
        } else if (selected === '') {
            newServices = services.filter(ser => ser.date.toUpperCase() === date.toUpperCase())
        } else {
            newServices = services.filter(ser => ser.type.toUpperCase() === selected.toUpperCase())
                .filter(ser => ser.date.toUpperCase() === date.toUpperCase())
        }
        setServices(newServices);
        setModalVisible(false)
    }

    async function insertTask(taskName, selected) {
        const url = 'https://sul-construtora-default-rtdb.firebaseio.com/funcionarios.json';
        const response = await fetch(url);
        const employees = await response.json();
        const task = {
            id: uuid.v4(),
            name: taskName,
            type: selected,
            avaliable: true
        };
        let roomdId = room.id;
        let newEmployees =
            employees.map(emp => {
                if (emp.id === employee.id) {
                    emp.buildings.forEach(build => {
                        let room = build.rooms.find(room => room.id === roomdId);
                        if (room) {
                            room.tasks.push(task);
                        }
                    });
                }
                return emp;
            });

        const headers = { "Content-Type": "application/json" };
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(newEmployees),
            headers: headers
        })
            .then(res => res.json())
            .then(json => console.log("RESPONSEEE", json))
            .catch(error => console.error(error));
        setModalVisible2(false);
    }

    useEffect(() => {
        if (employee == undefined) {
            console.log('heeey')
            setEmployeeNull(true);
        }
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
                    renderItem={({ item }) => (
                        <Service item={item} />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            {!employeeNull &&
                <View style={styles.buttons}>
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
                                <SelectList
                                    setSelected={(val) => setSelected(val)}
                                    data={serviceTypes}
                                    save="value"
                                />
                                <Button title="Continuar" onPress={() => filterServices(selected, date)} />
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity
                        style={[styles.buttonContainer, { backgroundColor: '#0077C9', borderRadius: 10 }]}
                        onPress={() => { setModalVisible2(true) }}
                    >
                        <View style={styles.filterIconContainer}>
                            <Text style={styles.filterText}>Criar tarefa </Text>
                        </View>
                    </TouchableOpacity>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible2}
                        onRequestClose={() => setModalVisible2(false)}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                                <Text> Tarefa: </Text>
                                <TextInput
                                    style={{
                                        height: 40,
                                        margin: 12,
                                        borderWidth: 1,
                                        padding: 10
                                    }}
                                    onChangeText={setTask}
                                    value={task}
                                />
                                <SelectList
                                    setSelected={(val) => setSelected2(val)}
                                    data={serviceTypes}
                                    save="value"
                                />
                                <Button title="Continuar" onPress={() => insertTask(task, selected2)} />
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity
                        style={[styles.buttonContainer, { backgroundColor: '#0077C9', borderRadius: 10 }]}
                        onPress={() => { navigation.navigate('Tarefas', { room: room, employee: employee }) }}
                    >
                        <View style={styles.filterIconContainer}>
                            <Text style={styles.filterText}>Ver Tarefas</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}

export default ServicesScreen;
