import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/app';
import 'firebase/firestore';

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
  { id: 1, name: 'Categoria 1' },
  { id: 2, name: 'Categoria 2' },
  { id: 3, name: 'Categoria 3' }
];

function Item({ name, onPress }) {
  return (
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text onPress={onPress}>{name}</Text>
    </View>
  );
}

function CategoriesScreen() {
  const navigation = useNavigation();
  const categoriesRef = firebase.firestore().collection('categories');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsubscribe = categoriesRef.onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      setCategories(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              onPress={() => navigation.navigate('Funcionários', { category: item })}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

export default CategoriesScreen;
