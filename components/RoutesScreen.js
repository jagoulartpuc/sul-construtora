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

function RoutesScreen( { route }) {
  const navigation = useNavigation();
  const [routes, setRoutes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const { building } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRoutes(building.tasks);
        setRooms(building.rooms);
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
              onPress={() => navigation.navigate('Serviços', { room: item })}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

export default RoutesScreen;