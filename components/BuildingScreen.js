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

function BuildingScreen({ route }) {
  const navigation = useNavigation();
  const [buildings, setBuildings] = useState([]);
  const { employee } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setBuildings(employee.buildings);
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
          data={buildings}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              onPress={() => navigation.navigate('Salas', { building: item })}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

export default BuildingScreen;