import React from "react";
import { View, Text, Button,  TouchableOpacity,StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text>Welcome to the Home!</Text>
            <TouchableOpacity
            style={styles.floatingButton}
            onPress={ () => navigation.navigate("Vet")} >
                <Entypo name="chat" size={40} color={"black"}/>
           </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({

    container:{
        flex: 1, 
    },
    floatingButton:{
        position: 'absolute',
        width: 60,
        height:60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 10,
    }

})