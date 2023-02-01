import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
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

function EmployeesScreen() {
  const navigation = useNavigation();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sul-construtora-default-rtdb.firebaseio.com/funcionarios.json');
        const data = await response.json();
        setEmployees(data.filter(emp => !emp.isAdmin));
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
          data={employees}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              onPress={() => navigation.navigate('Prédios', { employee: item })}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
        <View style={{ margin: 40 }}>
          <Button
            title="Ver Prédios"
            onPress={() => navigation.navigate('Todos Prédios', { employees })}
          />
        </View>
      </View>
    </View>
  );
}

export default EmployeesScreen;