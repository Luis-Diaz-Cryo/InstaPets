import React, { createContext, useEffect, useReducer, useState } from 'react';
import { authReducer } from "./AuthReducer";
import { User } from "../interfaces/User";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { dbInstance } from "../utils/Firebase";
import { setDoc, doc, collection, getDocs, where, query, getDoc } from 'firebase/firestore';
import { GeminiResponseData } from '../interfaces/appInterace';
import axios, { AxiosResponse } from "axios";
import { Message } from '../interfaces/message';
import { Contact } from '../interfaces/Contact';

export interface AuthState {
    email: string,
    password: string
}

const initialState = { email: "bobs@urhouse.com", password: "" }

export const AuthContext = createContext({} as any);

const API_URL: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const API_KEY: string =  'AIzaSyC0iijSdvIhOhGbdGCSVG6o4DxmFX2LRic';

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [vetchatHistory, setVetChatHistory] = useState([] as Message[]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [currentContact, setCurrentContact] = useState<Contact | null>(null);
    const [rooms, setRooms]=useState([])
    const [currentRoom, setCurrentRoom] = useState({})
   
    const selectContact = (contact: Contact) => {
        setCurrentContact(contact);
    }
    const auth = getAuth();

    useEffect(() => {
        if (currentUser == null) return;
        console.log({
            currentUser
        });
        getCurrentVetHistory(currentUser.email);
    }, [currentUser]);

    const onChange = (email: string, password: string) => {
        dispatch({ type: "onChange", payload: { email, password } });
    };

    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Current User:", user);
            getCurrentUser(email);
            getCurrentVetHistory(email);
            return true;
        } catch (error) {
            console.error("Error signing in:", error);
            return false;
        }
    };

    const googleLogin = async (googleToken: string) => {
        try {
            const credential = GoogleAuthProvider.credential(googleToken);
            const userCredential = await signInWithCredential(auth, credential);
            const user = userCredential.user;
            await addUserDataToFirestore(user.displayName, user.email, user.photoURL);
            getCurrentUser(user.email);
            getCurrentVetHistory(user.email);

            console.log("Google login successful");
            return true;
        } catch (error) {
            console.error("Error signing in with Google:", error);
            return false;
        }
    };

    const signUp = async (username: string, email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await addUserDataToFirestore(username, email, "no photo");
            return true;
        } catch (error) {
            console.error("Error signing up:", error);
            return false;
        }
    };

    const getCurrentUser = async (email: string) => {
        try {
            const userCollection = collection(dbInstance, "users");
            const q = query(userCollection, where("email", "==", email));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                console.log("No matching documents.");
                return null;
            }

            let user = null;
            snapshot.forEach(doc => {
                user = { id: doc.id, ...doc.data() };
            });

            setCurrentUser(user);
            console.log("this the current user", user);
        } catch (error) {
            console.error("Error getting documents: ", error);
            return null;
        }
    };

    const addUserDataToFirestore = async (username: string, email: string, photoURL: string) => {
        try {
            await setDoc(doc(dbInstance, "users", email), {
                username: username,
                email: email,
                photoURL: photoURL
            });
        } catch (error) {
            console.error("Error adding user data to Firestore:", error);
        }
    };

    async function chatWithGemini(userMessage: string, currentUser: User): Promise<string> {
        try {
            const response: AxiosResponse<GeminiResponseData> = await axios.post(
                `${API_URL}?key=${API_KEY}`,
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `name: ${currentUser.userName}, Email: ${currentUser.email},  You are mr,vet you are  a veteranian the info u have is the username and email of the current user You are to help the user with all there Vet Needs [you dont need to list them all unless asked too also dont introduce yourself until u are asked too dont reintroduce your self every message],[also the user are not vets you are the vet ]  ` + userMessage,
                                },
                            ],
                        },
                    ],

                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const responseData: GeminiResponseData = response.data;
            const responseText: string = responseData.candidates[0]?.content?.parts[0]?.text || '';

            const updatedChatHistory = [
                ...vetchatHistory,
                { text: userMessage, isUser: true },
                { text: responseText, isUser: false },
            ];

            setVetChatHistory(updatedChatHistory);
            addVetDataToFirestore(currentUser.email, updatedChatHistory);

            return responseText;
        } catch (error) {
            console.error('Error:');
            throw error;
        }
    }

    const addVetDataToFirestore = async (email: string, chatHistory: Message[]) => {
        try {
            await setDoc(doc(dbInstance, "VetsChats", email), {
                email: email,
                vetChats: chatHistory
            });
        } catch (error) {
            console.error("Error adding Vet data to Firestore:", error);
        }
    };

    const getCurrentVetHistory = async (email: string) => {
        try {
            const userCollection = collection(dbInstance, "VetsChats");
            const q = query(userCollection, where("email", "==", email));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                console.log("No matching documents.");
                setVetChatHistory([]);
                return null;
            }

            let chatHistory = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                chatHistory = data.vetChats || [];
            });

            setVetChatHistory(chatHistory);
            return chatHistory;
        } catch (error) {
            console.error("Error getting veterinarian chat history: ", error);
            return null;
        }
    };

    const addContact = async (contactName: string, email: string) => {
        try {
            const userCollection = collection(dbInstance, "users");
            const q = query(userCollection, where("email", "==", currentUser.email));
            const snapshot = await getDocs(q);
    
            if (snapshot.empty) {
                console.log("No matching documents for contact.");
                return false;
            }
    
            const contact: Contact = { contactName, email, ChatHistory: [] };
            const updatedContacts = [...contacts, contact]; // Update the local state first
            setContacts(updatedContacts);
    
            await setDoc(doc(dbInstance, "contacts", currentUser.email), {
                email: currentUser.email,
                contacts: updatedContacts // Use the updated state when saving to Firestore
            });
    
            return true;
        } catch (error) {
            console.error("Error adding contact:", error);
            return false;
        }
    };
    

    const getUserContacts = async (email: string) => {
        try {
            const userDoc = await getDoc(doc(dbInstance, "contacts", email));
    
            if (!userDoc.exists()) {
                console.log("No contacts found for user.");
                setContacts([]);
                return;
            }
    
            const userData = userDoc.data();
            const userContacts = userData.contacts || [];
    
            setContacts(userContacts);
            console.log("Fetched user contacts:", userContacts);
        } catch (error) {
            console.error("Error getting user contacts:", error);
        }
    };

    const getRooms = async (email: string) => {
        try {
            const roomCollection = collection(dbInstance, "rooms");
            const q = query(roomCollection, where("participantsArray", "array-contains", email));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                console.log("No rooms found.");
                setRooms([]);
                return;
            }

            const roomList = [];
            snapshot.forEach(doc => {
                roomList.push({ id: doc.id, ...doc.data() });
            });

            setRooms(roomList);
            console.log("Fetched rooms:", roomList);
        } catch (error) {
            console.error("Error getting rooms:", error);
        }
    };

    const getCurrentRoom = async (currentUserEmail:string, contactEmail:string ) => {
        try {
            const roomCollection = collection(dbInstance, "rooms");
            const q = query(roomCollection, where("participantsArray", "array-contains", currentUserEmail));
            const snapshot = await getDocs(q);
    
            if (snapshot.empty) {
                console.log("No current room found.");
                return null;
            }
    
            let currentRoom = null;
            snapshot.forEach(doc => {
                const roomData = doc.data();
                if (roomData.participantsArray.includes(contactEmail)) {
                    currentRoom = { id: doc.id, ...roomData };
                }
                
            });
    
            console.log("Current room:", currentRoom);
            console.log("room id",currentRoom.id)
            setCurrentRoom(currentRoom)
            return currentRoom;
        } catch (error) {
            console.error("Error getting current room:", error);
            return null;
        }
    };
    
    

    return (
        <AuthContext.Provider
            value={{
                state,
                onChange,
                login,
                signUp,
                currentUser,
                googleLogin,
                chatWithGemini,
                vetchatHistory,
                contacts,
                addContact,
                getUserContacts,
                currentContact,
                selectContact,
                rooms,
                getRooms,
                getCurrentRoom,
                currentRoom
                
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
