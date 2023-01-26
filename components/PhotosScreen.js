import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Photo from './Photo'

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
  }
});

function Item({ name, onPress }) {
  return (
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text onPress={onPress}>{name}</Text>
    </View>
  );
}

function PhotosScreen({ route }) {
  const [photos, setPhotos] = useState([]);
  const { room } = route.params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setPhotos(room.photo);
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
            <Photo item={item} />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <TouchableOpacity
        style={[styles.plusButton, { borderRadius: 25, backgroundColor: '#0077C9' }]}
        onPress={() => {
          // Open camera code here
        }}
      >
        <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PhotosScreen;
