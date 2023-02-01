import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={services}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableText}> {item.task} </Text>
            </View>
          )}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.plusButton, { borderRadius: 25, backgroundColor: '#0077C9' }]}
          onPress={() => navigation.navigate('Camera', { room: room })}
        >
          <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ServicesScreen;
