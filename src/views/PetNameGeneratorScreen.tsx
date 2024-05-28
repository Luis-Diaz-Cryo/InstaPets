import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { Text, Button, TextInput } from "react-native";
import axios from "axios";

const PetNameGeneratorScreen = () => {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchPetNames = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://pet-name-generator.p.rapidapi.com/all-pet-names",
      params: { search: search },
      headers: {
        "X-RapidAPI-Key": "3f5086cba5mshe1f8875d18843acp131ad9jsn630d6314596e",
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
      <Text  style={styles.title}>
        Pet Name Generator
      </Text>
      <TextInput
        placeholder="Enter a letter"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
      <TouchableOpacity onPress={fetchPetNames}
        style={styles.button}>
          <Text>Generate Names</Text>
      </TouchableOpacity>
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
