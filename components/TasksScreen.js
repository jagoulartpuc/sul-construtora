import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

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
    }
});

function Item({ name, onPress }) {
    return (
        <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text onPress={onPress}>{name}</Text>
        </View>
    );
}

function TasksScreen({ route }) {
    const { room, employee } = route.params;
    const [avaliableTasks, setAvaliableTasks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://sul-construtora-default-rtdb.firebaseio.com/funcionarios.json');
            const employees = await response.json();
            const id = employee.id
            let roomId = room.id;
         
            employees.forEach(emp => {
                if (emp.id === id) {
                    emp.buildings.forEach(build => {
                        let room = build.rooms.find(room => room.id === roomId);
                        if (room) {
                            setAvaliableTasks(room.tasks.filter(task => task.avaliable))
                        }
                    });
                }
            });
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, []);

    async function closeTask(task) {
        const url = 'https://sul-construtora-default-rtdb.firebaseio.com/funcionarios.json';
        const response = await fetch(url);
        const employees = await response.json();
        console.log(employee)
        const id = employee.id
        let roomId = room.id;
        let newEmployees =
            employees.map(emp => {
                if (emp.id === id) {
                    emp.buildings.forEach(build => {
                        let room = build.rooms.find(room => room.id === roomId);
                        if (room) {
                            room.tasks.forEach(tsk => {
                                if (tsk.id === task.id) {
                                    tsk.avaliable = false;
                                }
                                console.log('task', tsk)
                            })
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
            .catch(error => console.error(error));
    }

    return (
        <View style={styles.container}>
            <View style={styles.flatListContainer}>
                <FlatList
                    data={avaliableTasks}
                    renderItem={({ item }) => (
                        <Item
                            name={item.name}
                            onPress={() => { closeTask(item) }}
                        />
                    )}
                //keyExtractor={item => item.id.toString()}
                />
            </View>
        </View>
    );
}

export default TasksScreen;