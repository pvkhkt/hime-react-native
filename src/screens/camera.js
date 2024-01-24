import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import { upload, ocr } from "../utils/http";
import * as ImagePicker from "expo-image-picker";

function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result.assets[0].uri);
    setPhoto(result.assets[0].uri);
    setShowReview(true);
    setIsLoading(false);
  };

  const retakePicture = () => {
    setPhoto(null);
    setShowReview(false);
  };

  const aiDetection = async () => {
    setIsLoading(true);
    // Send the photo to the server here
    const response = await upload(photo);
    navigation.navigate("Library", { data: response });
    setIsLoading(false);
    setShowReview(false);
  };

  const ocrDetection = async () => {
    setIsLoading(true);
    // Send the photo to the server here
    const response = await ocr(photo);
    navigation.navigate("Library", { data: response });
    setIsLoading(false);
    setShowReview(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!photo && (
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.text}>Chụp</Text>
        </TouchableOpacity>
      )}
      {photo && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={retakePicture}>
              <Text style={styles.text}>Chụp lại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Chụp</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal visible={showReview} animationType="slide">
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={retakePicture}>
                  <Text style={styles.text}>Chụp lại</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={aiDetection}>
                  <Text style={styles.text}>Nhận diện</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={ocrDetection}>
                  <Text style={styles.text}>Nhận diện chữ viết</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "coral",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  previewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 30,
  },
});
