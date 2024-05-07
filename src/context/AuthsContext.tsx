import { createContext, useReducer, useState } from 'react';
import React from 'react';
import { authReducer } from "./AuthReducer";
import { User } from "../interfaces/User";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { dbInstance } from "../utils/Firebase";
import { setDoc, doc } from 'firebase/firestore';

export interface AuthState {
    email: string,
    password: string
}

const initialState = { email: "bobs@urhouse.com", password: "" }

export const AuthContext = createContext({} as any)

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const auth = getAuth();

    const onChange = (email: string, password: string) => {
        dispatch({ type: "onChange", payload: { email, password } })
    }

    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            //console.log("Current User:", user);
            return true;
        } catch (error) {
            console.error("Error signing in:", error);
            return false;
        }
    }

    const signUp = async (username: string, email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await addUserDataToFirestore(username, email);
            return true;
        } catch (error) {
            console.error("Error signing up:", error);
            return false;
        }
    }

    const addUserDataToFirestore = async (username: string, email: string) => {
        try {
            await setDoc(doc(dbInstance, "users", email), {
                username: username,
                email: email
            });
        } catch (error) {
            console.error("Error adding user data to Firestore:", error);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                state,
                onChange,
                login,
                signUp,
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
