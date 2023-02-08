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
  buttonContainer: {
    marginTop: 40,
    position: 'relative',
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
  }
});

function Item({ name, onPress }) {
  return (
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text onPress={onPress}>{name}</Text>
    </View>
  );
}

function RoomScreen({ route }) {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);
  const { building, employee } = route.params;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sul-construtora-default-rtdb.firebaseio.com/funcionarios.json');
        const data = await response.json();
        const id = await (AsyncStorage.getItem('id'));
        let user = data.find(emp => emp.id === id);
        setIsAdmin(user.isAdmin);
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
        <FlatList
          data={rooms}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              onPress={() => {
                if (isAdmin) {
                  navigation.navigate('Serviços Admin', { room: item, employee: employee });
                } else {
                  navigation.navigate('Serviços', { room: item });
                }
              }}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

export default RoomScreen;