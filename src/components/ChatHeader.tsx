import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import Avatar from './Avatar';
import { AuthContext } from '../context/AuthsContext';
import { Ionicons } from '@expo/vector-icons';

export default function ChatHeader({ navigation }) {
    const { currentContact } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <Avatar size={40} user={currentContact}  />
            <View style={styles.textContainer}>
                <Text style={styles.contactName}>{currentContact.contactName}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding:25,
        backgroundColor: '#f8f8f8', // Optional: Background color for the header
    },
    backButton: {
        marginRight: 10,
    },
    avatar: {
        marginRight: 15,
    },
    textContainer: {
        justifyContent: 'center',
    },
    contactName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
