import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { AuthContext } from "../context/AuthsContext";
import { dbInstance } from "../utils/Firebase";

const QRCodeScreen = () => {
  const {currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(currentUser)


  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDoc = currentUser
          if (userDoc.exists) {
            setUserData(userDoc);
            console.log(currentUser)
          }
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [userData]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2096F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text  style={styles.title}>
        Your QR Code
      </Text>
      {userData ? (
        <QRCode value={JSON.stringify(currentUser)} size={200} />
      ) : (
        <Text>No User Data</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
});

export default QRCodeScreen;
