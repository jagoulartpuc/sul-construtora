import React from 'react';
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

const data = [
  { id: 1, name: 'Foto 1' },
  { id: 2, name: 'Foto 2' },
  { id: 3, name: 'Foto 3' }
];

function Item({ name, onPress }) {
  return (
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text onPress={onPress}>{name}</Text>
    </View>
  );
}

function PhotosScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Item
              name={item.name}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

export default PhotosScreen;
