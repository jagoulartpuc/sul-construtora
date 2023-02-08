import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
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
    marginBottom: 100
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    left: 120,
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
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,

  },
  tableText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
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

const correctivesChecks = ["Foto comparando o solo", "Foto do serviço sendo executado", "Foto do termômetro de temperatura",
  "Foto do relógio de pressão (se arrumar a porta externa", "Foto do OS da prefeitura e da empresa assinada (caso tenha)", "Motivo e foto caso serviço não foi realizado"];
const preventivesChecks = ["Foto comparando o solo", "Foto do serviço sendo executado", "Foto do termômetro de temperatura",
  "Foto do relógio de pressão (se arrumar a porta externa", "Foto do aparelho limpo", "Motivo e foto caso serviço não foi realizado"];

function getAllRooms(employees) {
  let rooms = [];
  for (const employee of employees.filter(emp => !emp.isAdmin)) {
    for (const building of employee.buildings) {
      rooms = rooms.concat(building.rooms);
    }
  }

  return rooms;
}

function Item({ name, onPress }) {
  return (
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text onPress={onPress}>{name}</Text>
    </View>
  );
}

function ServicesScreen({ route }) {
  const [services, setServices] = useState([]);
  const { room } = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [tasks, setTasks] = useState([]);
  let avaliableTasks = tasks.filter(task => task.avaliable);

  function OpenModal({ checks, modalVisible, setModalVisible }) {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', width: 300, height: 400, padding: 20, borderRadius: 10 }}>
            <FlatList
              data={checks}
              renderItem={({ item }) => (
                <Text>- {item}</Text>
              )}
            ></FlatList>
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sul-construtora-default-rtdb.firebaseio.com/funcionarios.json');
        const data = await response.json();
        console.log(room)
        setServices(getAllRooms(data).find(rm => rm.id === room.id).services);
        setTasks(room.tasks)
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
          data={avaliableTasks}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              onPress={() => navigation.navigate('Camera', { room: room, task: item.name })}
            />
          )}
          keyExtractor={item => item.name.toString()}
        />
        <TouchableOpacity
          style={[styles.buttonContainer, { backgroundColor: '#0077C9', borderRadius: 10 }]}
          onPress={() => { setModalVisible(true) }}
        >
          <View style={styles.filterIconContainer}>
            <Text style={styles.filterText}>Ver checagens corretivas</Text>
          </View>
        </TouchableOpacity>
        {modalVisible && <OpenModal checks={correctivesChecks} modalVisible={modalVisible} setModalVisible={setModalVisible} />}
        <TouchableOpacity
          style={[styles.buttonContainer, { backgroundColor: '#0077C9', borderRadius: 10 }]}
          onPress={() => { setModalVisible2(true) }}
        >
          <View style={styles.filterIconContainer}>
            <Text style={styles.filterText}>Ver checagens preventivas</Text>
          </View>
        </TouchableOpacity>
        {modalVisible2 && <OpenModal checks={preventivesChecks} modalVisible={modalVisible2} setModalVisible={setModalVisible2} />}
      </View>
    </View>
  );
}

export default ServicesScreen;
