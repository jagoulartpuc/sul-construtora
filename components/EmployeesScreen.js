import React from 'react';
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

function EmployeesScreen({ route }) {
  const navigation = useNavigation();
  const { category } = route.params;
  const employees = [
    { id: 1, name: 'Funcionário 1', categoryId: 1 },
    { id: 2, name: 'Funcionário 2', categoryId: 2 },
    { id: 3, name: 'Funcionário 3', categoryId: 3 },
  ];

  const employeesInCategory = employees.filter(employee => employee.categoryId === category.id);

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={employeesInCategory}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              onPress={() => navigation.navigate('Prédios', { category: item })}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

export default EmployeesScreen;