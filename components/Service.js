import { View, Text, Image, Modal, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';

function Item({ name, onPress }) {
    return (
        <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text onPress={onPress}>{name}</Text>
        </View>
    );
}

function Service({ item }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Item
                name={item.task + " - "+ item.type + ": " + item.date}
                onPress={() => { setModalVisible(true) }}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Image
                            source={{ uri: item.content }}
                            style={{ width: 340, height: 340 }}
                        />
                        <Text>Data: {item.date}</Text>
                        <Text>Descrição: {item.description}</Text>
                        <Button title="Fechar" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default Service;