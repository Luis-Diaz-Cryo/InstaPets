import React, { useContext, useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthsContext";


export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login} = useContext(AuthContext);

    const handleLogin = async () => {
        
        const response = await login(email, password);
        if (response) {
            navigation.navigate("Home");
            
            
        }
       
    }

    return (
        <View>

            <Text>Login Screen</Text>

            <Text >Email</Text>
            <TextInput
               
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Email"
            />

            <Text >Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Password"
                secureTextEntry
            />

            <TouchableOpacity  onPress={handleLogin}>
                <Text>Enter</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => navigation.goBack()}>
                <Text>Back</Text>
            </TouchableOpacity>

        </View>
    );
}
