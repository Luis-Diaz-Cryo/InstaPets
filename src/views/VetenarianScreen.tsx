import React, { useContext } from 'react';
import { useEffect, useState, useRef } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import styles from "../AppSyles/Styles";
import { AuthContext } from '../context/AuthsContext';
import { Message } from "../interfaces/message";
import { User } from "../interfaces/User";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function VetenarianScreen({ navigation }: any) {

    const [User, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        VetMessages: []
    } as User)

    const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { chatWithGemini, currentUser, vetchatHistory } = useContext(AuthContext)

    const scrollViewRef = useRef<ScrollView>(null);

    const handleSend = async () => {
        if (!message?.trim()) return;

        setIsLoading(true);
        try {
            const geminiResponse = await chatWithGemini(message, currentUser);

            setUser({
                ...User,
                VetMessages: [...User.VetMessages, { text: message, isUser: true }, { text: geminiResponse, isUser: false }]
            })

            scrollViewRef.current?.scrollToEnd();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }

        setMessage('');
    };

    return (
        <View style={styles.chatWindowncontainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Vet</Text>
            </View>
            <ScrollView
                style={styles.messagesList}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}>
                {vetchatHistory.map((msg: any, index: any) => (
                    <Text
                        key={index}
                        style={[
                            styles.message,
                            msg.isUser ? styles.userMessage : styles.geminiMessage,
                        ]}>
                        {msg.text}
                    </Text>
                ))}
                {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
            </ScrollView>
            <TextInput
                style={styles.Chatinput}
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message"
                multiline
            />
            <Button title="Send" onPress={handleSend} />
        </View>
    );
};
