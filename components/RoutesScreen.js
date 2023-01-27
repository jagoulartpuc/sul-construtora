import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    marginBottom: 200,
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
  taskText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    marginTop: 60
  }
});

function Item({ name, onPress }) {
  return (
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text onPress={onPress}>{name}</Text>
    </View>
  );
}

const getTasksByEmployee = (employees, employeeId) => {
  let tasks = [];
  employees.forEach((employee) => {
    if (employee.id && employee.id === employeeId) {
      employee.buildings.forEach((building) => {
        tasks = tasks.concat(building.tasks);
      });
    }
  });
  return tasks;
}

const getRoomsByEmployee = (employees, employeeId) => {
  let rooms = [];
  employees.forEach((employee) => {
    if (employee.id && employee.id === employeeId) {
      employee.buildings.forEach((building) => {
        rooms = rooms.concat(building.rooms);
      });
    }
  });
  return rooms;
}

function RoutesScreen() {
  const navigation = useNavigation();
  const [routes, setRoutes] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sul-construtora-default-rtdb.firebaseio.com/categories.json');
        const data = await response.json();
        let employees = data.reduce((acc, cat) => {
          return acc.concat(cat.employees);
        }, []);
        const id = await (AsyncStorage.getItem('id'));
        const tasks = getTasksByEmployee(employees, id)
        const roomsFound = getRoomsByEmployee(employees, id)
        setRoutes(tasks);
        setRooms(roomsFound);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <Text style={styles.taskText}>Tarefas</Text>
        <FlatList
          data={routes}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableText}> {item} </Text>
            </View>
          )}
        />
        <Text style={styles.taskText}> Salas </Text>
        <FlatList
          data={rooms}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              onPress={() => navigation.navigate('Fotos', { room: item })}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

export default RoutesScreen;