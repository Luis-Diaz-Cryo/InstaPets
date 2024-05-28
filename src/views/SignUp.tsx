import React, { useContext, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Input, Button, Text, Icon } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../context/AuthsContext";

export default function SignUpScreen({ navigation }: any) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = useContext(AuthContext);

  const handleSignUp = async () => {
    const response = await signUp(userName, email, password);
    navigation.navigate("Login");
  };

  return (
    <LinearGradient colors={["#004d40", "#004d40"]} style={styles.container}>
      <View style={styles.content}>
        <Text h3 style={styles.title}>
          Register
        </Text>
        <Input
          label="Full Name"
          value={userName}
          onChangeText={setUserName}
          placeholder="Enter Full Name"
          containerStyle={styles.input}
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
          containerStyle={styles.input}
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password"
          secureTextEntry
          containerStyle={styles.input}
        />
        <View style={styles.socialContainer}>
          <Icon
            name="google"
            type="font-awesome"
            color="#DB4437"
            containerStyle={styles.socialIcon}
          />
          <Icon
            name="facebook"
            type="font-awesome"
            color="#4267B2"
            containerStyle={styles.socialIcon}
          />
          <Icon
            name="apple"
            type="font-awesome"
            color="#000000"
            containerStyle={styles.socialIcon}
          />
        </View>
        <Button
          title="Register"
          onPress={handleSignUp}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
        />
        <Text style={styles.footerText}>
          Already Member?
          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
    color: "#004d40",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#004d40",
  },
  buttonContainer: {
    marginVertical: 16,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  socialIcon: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footerText: {
    textAlign: "center",
    color: "#004d40",
  },
  loginText: {
    color: "#2096F3",
    fontWeight: "bold",
  },
});
