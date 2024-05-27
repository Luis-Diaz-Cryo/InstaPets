import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Modal, Button, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthsContext';
import ListItem  from '../components/ListItem'; 

export default function ContactScreen({ navigation }: any) {
    const { currentUser, contacts, addContact, getUserContacts } = useContext(AuthContext);
    const [contactEmail, setContactEmail] = useState('');
    const [contactName, setContactName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (currentUser && currentUser.email) {
            getUserContacts(currentUser.email);
        }
    }, [currentUser]);

    useEffect(() => {
        console.log("Contacts in ContactScreen:", contacts);
    }, [contacts]);

    const handleAddContact = async () => {
        const success = await addContact(contactName, contactEmail);
        if (success) {
            setContactEmail('');
            setContactName('');
            setModalVisible(false);
            alert('Contact added successfully!');
        } else {
            alert('Failed to add contact.');
        }
    };


    

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, padding: 5, paddingRight: 10 }}>
                <Text>Welcome to the Contacts!</Text>
                <ScrollView>
                    {contacts && contacts.length > 0 ? (
                        contacts.map((contact, index) => (
                            <ListItem
                                key={index}
                                type="contacts"
                                user={contact}
                                navigation={navigation}
                            />
                        ))
                    ) : (
                        <Text>No contacts available</Text>
                    )}
                </ScrollView>
            </ScrollView>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    backgroundColor: 'blue',
                    borderRadius: 30,
                    width: 60,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <AntDesign  name="pluscircleo" size={30} color="white" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
                        <Text style={{ marginBottom: 10 }}>Add Contact</Text>
                        <TextInput
                            placeholder="Contact Name"
                            value={contactName}
                            onChangeText={setContactName}
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                        />
                        <TextInput
                            placeholder="Contact Email"
                            value={contactEmail}
                            onChangeText={setContactEmail}
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                        />
                        <Button title="Add Contact" onPress={handleAddContact} />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
