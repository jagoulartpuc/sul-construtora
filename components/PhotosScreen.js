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
  },
});

function Item({ name, onPress }) {
  return (
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text onPress={onPress}>{name}</Text>
    </View>
  );
}

function PhotosScreen( { route } ) {
  const [photos, setPhotos] = useState([]);
  const { category, employee, building, room } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sul-construtora-default-rtdb.firebaseio.com/categories.json');
        const data = await response.json();
        const categoryFound = data.find(cat => cat.name === category.name);
        const employeeFound = categoryFound.employees.find(emp => emp.id === employee.id)
        const buildingFound = employeeFound.buildings.find(build => build.id === building.id)
        const roomFound = buildingFound.rooms.find(rm => rm.id === room.id)
        console.log(roomFound.photo)
        setPhotos(roomFound.photo);
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
          data={photos}
          renderItem={({ item }) => (
            <Item
              name={item.description}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

export default PhotosScreen;
