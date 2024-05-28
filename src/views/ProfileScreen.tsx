
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Avatar from '../components/Avatar';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthsContext';
import CustomModal from '../components/CustomModal'; 

export default function ProfileScreen({ navigation }) {
    const { currentUser } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false); 

    const handleLogout = () => {
        navigation.navigate('StartScreen');
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'flex-end', padding: 10 }}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image source={require('../assets/logoInsta.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Avatar user={currentUser} size={90} />
                <Text>{currentUser.username}</Text>
            </View>
            <CustomModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onLogout={handleLogout}
                onQRCode={() => navigation.navigate('QRCode')}
                onGenerator={() => navigation.navigate('Generator')}
            />
        </View>
    );
}
