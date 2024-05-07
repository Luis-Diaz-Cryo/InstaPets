import React from "react";
import { View, Text, Button } from "react-native";


export default function StartScreen({ navigation }: any) {
    

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to InstaPets!</Text>
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                title="SignUp"
                onPress={() => navigation.navigate('SignUp')}
            />
            
        </View>
    );
}
