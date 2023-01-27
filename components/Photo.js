import { View, Text, Image, Modal, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';

function Photo({ item }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                    source={{ uri: item.content }}
                    style={{ width: 160, height: 160 }}
                />
            </TouchableOpacity>
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

export default Photo;