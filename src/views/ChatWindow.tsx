import "react-native-get-random-values";
import { nanoid } from 'nanoid';
import { View } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ChatHeader from '../components/ChatHeader';
import { AuthContext } from '../context/AuthsContext';
import { collection, doc, setDoc, addDoc, onSnapshot, updateDoc } from "@firebase/firestore";
import { dbInstance } from "../utils/Firebase";
import { GiftedChat } from "react-native-gifted-chat";

const randomId = nanoid();

export default function ChatWindow({ navigation }) {
    const [roomHash, setRoomHash] = useState("");
    const [messages, setMessages] = useState([]);
    const { currentUser, currentContact, currentRoom, getCurrentRoom } = useContext(AuthContext);
    const selectImage = currentContact?.image;
    const userB = currentContact;

    const senderUser = currentUser?.photoURL
        ? {
            name: currentUser.username,
            _id: currentUser.email,
            avatar: currentUser.photoURL
        }
        : { name: currentUser.username, _id: currentUser.email };
    
    useEffect(() => {
        (async () => {
            const room = await getCurrentRoom(currentUser.email, currentContact.email);
            if (room) {
                setRoomHash(`${currentUser.email}:${currentContact.email}`);
            } else {
                const currUserData = {
                    displayName: currentUser.username,
                    email: currentUser.email,
                };
                const userBData = {
                    displayName: userB.contactName || userB.displayName || "",
                    email: userB.email,
                };
                const roomData = {
                    participants: [currUserData, userBData],
                    participantsArray: [currentUser.email, userB.email],
                };
                try {
                    const roomRef = doc(dbInstance, "rooms", randomId);
                    await setDoc(roomRef, roomData);
                    setRoomHash(`${currentUser.email}:${userB.email}`);
                } catch (error) {
                    console.log(error);
                }
            }
        })();
    }, [currentUser, currentContact]);

    useEffect(() => {
        if (!currentRoom || !currentRoom.id) return;
        const roomMessagesRef = collection(dbInstance, "rooms", currentRoom.id, "messages");

        const unsubscribe = onSnapshot(roomMessagesRef, querySnapshot => {
            const messagesFireStore = querySnapshot.docChanges()
                .filter(({ type }) => type === "added")
                .map(({ doc }) => {
                    const message = doc.data();
                    return { ...message, createdAt: message.createdAt.toDate() };
                });
            appendMessages(messagesFireStore);
        });
        return () => unsubscribe();
    }, [currentRoom]);

    const appendMessages = useCallback((messages) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
    }, [messages]);

    async function onSend(messages = []) {
        if (!currentRoom || !currentRoom.id) return;
        const roomRef = doc(dbInstance, "rooms", currentRoom.id);
        const roomMessagesRef = collection(dbInstance, "rooms", currentRoom.id, "messages");

        const validatedMessages = messages.map(m => ({
            ...m,
            user: {
                ...m.user,
                name: m.user.displayName || 'Unknown',
            },
            createdAt: m.createdAt || new Date(),
        }));

        console.log('Sending messages:', validatedMessages);

        const writes = validatedMessages.map(m => addDoc(roomMessagesRef, m));
        const lastMessage = validatedMessages[validatedMessages.length - 1];
        await Promise.all(writes);
        await updateDoc(roomRef, { lastMessage });
    }

    return (
        <View style={{ flex: 1 }}>
            <ChatHeader navigation={navigation} />
            <GiftedChat
                onSend={onSend}
                messages={messages}
                user={senderUser}
                renderAvatar={null}
            />
        </View>
    );
}
