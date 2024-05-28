import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Camera ,CameraType } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';


const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [scannedData, setScannedData] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScannedData(data);
    Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      setPhotoUri(photo.uri);
      savePhoto(photo.uri);
    }
  };

  const savePhoto = async (uri) => {
    try {
      // Save to AsyncStorage
      await AsyncStorage.setItem("photoUri", uri);
  
      // Upload to Firebase Storage
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = `${uuidv4()}.jpg`;
      const storage = getStorage();
      const fileRef = ref(storage, `images/${filename}`);
      const uploadTask = await uploadBytesResumable(fileRef, blob);
      const url = await getDownloadURL(uploadTask.ref);
  
      Alert.alert("Photo saved successfully!", `URL: ${url}`);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "There was an error saving the photo");
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => setCameraRef(ref)}
        onBarCodeScanned={scannedData ? undefined : handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === CameraType.back
                  ? CameraType.front
                  : CameraType.back
              );
            }}
          >
            <Ionicons name="camera-reverse-outline" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Ionicons name="camera-outline" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.photo} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  photo: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default CameraScreen;
