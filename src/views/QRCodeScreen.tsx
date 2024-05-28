import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "react-native-elements";
import QRCode from "react-native-qrcode-svg";
import { AuthContext } from "../context/AuthsContext";
import { dbInstance } from "../utils/Firebase";

const QRCodeScreen = () => {
  const { state } = useContext(AuthContext);
  const { userToken } = state;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userToken) {
        try {
          const user = auth.currentUser;
          const userDoc = await dbInstance
            .collection("users")
            .doc(user.uid)
            .get();
          if (userDoc.exists) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [userToken]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2096F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Your QR Code
      </Text>
      {userData ? (
        <QRCode value={JSON.stringify(userData)} size={200} />
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
