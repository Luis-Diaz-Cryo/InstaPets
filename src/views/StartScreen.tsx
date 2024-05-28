import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

export default function StartScreen({ navigation }: any) {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topContainer}>
                <ImageBackground
                    source={require('../assets/RectangleTop.png')}
                    style={styles.imageBackground}
                    resizeMode="cover"
                >
                </ImageBackground>
            </View>
            <View style={styles.spacer}>
                <View style={styles.topSection}>
                    <Text style={styles.welcomeText}>Welcome to InstaPets!</Text>
                    <Image source={require('../assets/logoInsta.png')} style={styles.logo}/>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <ImageBackground
                    source={require('../assets/RectangleBottom.png')}
                    style={styles.imageBackground}
                    resizeMode="cover"
                >
                    <View style={styles.bottomSection}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.buttonText}>Get Started</Text>
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
    topSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    bottomSection: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
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
        paddingVertical: 8,
        borderRadius: 5,
    },
    buttonContainer: {
        backgroundColor: '#063940',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 24,
        margin: 16,
        borderColor: 'white',
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logo: {
        width: 200, // Set the width of the logo according to your preference
        height: 200, // Set the height of the logo according to your preference
        resizeMode: 'contain', // Adjust the resizeMode as per your need
        backgroundColor: 'transparent',
    },
});
