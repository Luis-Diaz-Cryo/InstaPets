import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Avatar from "../components/Avatar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthsContext";

export default function ProfileScreen({ navigation }: any) {
    const { currentUser } = useContext(AuthContext)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Avatar user={currentUser} size={90} />
            <Text>{currentUser.username}</Text>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('StartScreen')}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    button: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#3498db',
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});


