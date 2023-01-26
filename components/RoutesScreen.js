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
  },
});

const data = [
  { id: 1, name: 'Atividade 1' },
  { id: 2, name: 'Atividade 2' },
  { id: 3, name: 'Atividade 3' }
];

function Item({ name, onPress }) {
  return (
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text onPress={onPress}>{name}</Text>
    </View>
  );
}

// Issue here
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

function RoutesScreen() {
  const navigation = useNavigation();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sul-construtora-default-rtdb.firebaseio.com/categories.json');
        const data = await response.json();
        let employees = data.reduce((acc, cat) => {
          return acc.concat(cat.employees);
        }, []);
        console.log('Employees', employees)
        const id = await (AsyncStorage.getItem('id'));
        console.log('id', id)
        const tasks = getTasksByEmployee(employees, id.toString())
        console.log('tasks', tasks)
        setRoutes(tasks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={routes}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              onPress={() => navigation.navigate('Salas', { room: item })}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

export default RoutesScreen;