import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
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
  },
});

function Item({ name, onPress }) {
  return (
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text onPress={onPress}>{name}</Text>
    </View>
  );
}

function RoomScreen( { route } ) {
  const navigation = useNavigation();  
  const [rooms, setRooms] = useState([]);
  const { building } = route.params;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
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
              onPress={() => navigation.navigate('Fotos', { room: item })}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

export default RoomScreen;