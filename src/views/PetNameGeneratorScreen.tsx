import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import axios from "axios";

const PetNameGeneratorScreen = () => {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchPetNames = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://pet-name-generator.p.rapidapi.com/female-pet-names",
      params: { search: search },
      headers: {
        "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
        "X-RapidAPI-Host": "pet-name-generator.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setNames(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Pet Name Generator
      </Text>
      <Input
        placeholder="Enter a letter"
        value={search}
        onChangeText={setSearch}
        containerStyle={styles.input}
      />
      <Button
        title="Generate Names"
        onPress={fetchPetNames}
        buttonStyle={styles.button}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#2096F3" />
      ) : (
        <FlatList
          data={names}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{item}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2096F3",
    marginBottom: 16,
  },
  nameContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 18,
  },
});

export default PetNameGeneratorScreen;
