import React, { useContext, useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthsContext";


export default function SignUpScreen({ navigation }: any) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signUp } = useContext(AuthContext);

    const handleSignUp = async () => {
        const response = await signUp(userName, email, password);
        navigation.navigate("Login");
    }

    return (
        <View>

            <Text>Sign up</Text>

            <Text>User name</Text>
            <TextInput
                value={userName}
                onChangeText={setUserName}
                placeholder="Enter User name"
            />

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

            <TouchableOpacity onPress={handleSignUp}>
                <Text >Enter</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => navigation.goBack()}>
                <Text >Back</Text>
            </TouchableOpacity>

        </View>
    );
}

