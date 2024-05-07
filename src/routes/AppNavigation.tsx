import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AuthProvider } from "../context/AuthsContext";
import StartScreen from "../views/StartScreen";
import LoginScreen from "../views/LoginScreen";
import SignUpScreen from "../views/SignUp";
import HomeScreen from "../views/HomeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation(){

    return(
        <NavigationContainer>
            <AuthProvider>
            <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
                headerShown:false
            }}
            >
                <Stack.Screen name="StartScreen" component={StartScreen}/>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                
            </Stack.Navigator>    
            </AuthProvider>      
        </NavigationContainer>
        
    )
}

