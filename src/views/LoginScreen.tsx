import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { AuthContext } from "../context/AuthsContext";
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '1071715437991-hoisisesstpma921lolbsv4thlf1mtng.apps.googleusercontent.com'
});

const { height, width } = Dimensions.get('window');

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, googleLogin } = useContext(AuthContext);

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
            await googleLogin(googleToken);
            navigation.navigate("Home");
        } catch (error) {
            console.error('Google sign in error:', error);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topContainer}>
                <ImageBackground
                    source={require('../assets/RectangleTop.png')}
                    style={styles.imageBackground}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.spacer}>
                <View style={styles.formContainer}>
                    <Text style={styles.welcomeText}>Login</Text>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter Email"
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter Password"
                        secureTextEntry
                    />
                    <GoogleSigninButton
                        onPress={handleGoogleSignIn}
                        style={styles.googleButton}
                    />
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <ImageBackground
                    source={require('../assets/RectangleBottom.png')}
                    style={styles.imageBackground}
                    resizeMode="cover"
                >
                    <View style={styles.bottomSection}>
                        <TouchableOpacity onPress={handleLogin} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Enter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.newHereButton}>
                            <Text style={styles.buttonText}>New Here? Register here</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        width: width,
    },
    spacer: {
        height: height / 2,
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
    },
    formContainer: {
        backgroundColor: 'transparent',
        paddingBottom: 20,
    },
    bottomContainer: {
        flex: 1,
        width: width,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    bottomSection: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
    },
    label: {
        fontSize: 16,
        color: '#195E63',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#063940',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        backgroundColor: '#063940',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 24,
        margin: 16,
        borderColor: 'white',
        borderWidth: 1,
        position:"absolute"
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    googleButton: {
        width: '12%',
        height: 48,
        marginVertical: 16,
    },
    newHereButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        margin: 16,
    },
    welcomeText: {
        fontSize: 36,
        fontFamily: 'Nunito',
        fontWeight: '400',
        lineHeight: 49.1,
        textAlign: 'left',
        backgroundColor: 'transparent',
        color: '#195E63',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 5,
    },
});
