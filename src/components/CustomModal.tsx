import React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const CustomModal = ({ visible, onClose, onLogout, onQRCode, onGenerator }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.button} onPress={onLogout}>
                                <Text style={styles.buttonText}>Logout</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={onQRCode}>
                                <Text style={styles.buttonText}>QR Code</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={onGenerator}>
                                <Text style={styles.buttonText}>Generator</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

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

export default CustomModal;
