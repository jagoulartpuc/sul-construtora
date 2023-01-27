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
  },
  tableRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  tableText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

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
          data={room.checkings}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableText}>-{item}</Text>
            </View>
          )}
        />
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
