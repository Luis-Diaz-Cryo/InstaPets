import React, { useContext, useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthsContext";
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '1071715437991-hoisisesstpma921lolbsv4thlf1mtng.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
});

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, googleLogin} = useContext(AuthContext);

    const handleLogin = async () => {
        const response = await login(email, password);
        if (response) {
            navigation.navigate("Home");
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const googleToken = userInfo.idToken;
            console.log({
                userInfo
            })
            await googleLogin(googleToken); 
            navigation.navigate("Home");
        } catch (error) {
            console.error('Google sign in error:', error);
        }
    }

    return (
        <View>
            <Text>Login Screen</Text>
            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Email"
            />

            <Text>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Password"
                secureTextEntry
            />

            <TouchableOpacity onPress={handleLogin}>
                <Text>Enter</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGoogleSignIn}>
                <Text>Sign in with Google</Text>
            </TouchableOpacity>
            <GoogleSigninButton
            onPress={handleGoogleSignIn}
            />
        </View>
    );
}