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

function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async (camera) => {
    setIsLoading(true);
    const photo = await camera.takePictureAsync({ quality: 0.5 });
    setPhoto(photo.uri);
    setShowCamera(false);
    setShowReview(true);
    setIsLoading(false);
  };

  const retakePicture = () => {
    setPhoto(null);
    setShowCamera(true);
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowCamera(true)}
        >
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
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowReview(true)}
            >
              <Text style={styles.text}>Chụp</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal visible={showCamera} animationType="slide">
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => {
            this.camera = ref;
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                )
              }
            >
              <Text style={styles.text}>Xoay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => takePicture(this.camera)}
            >
              <Text style={styles.text}>Chụp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowCamera(false)}
            >
              <Text style={styles.text}>Thoát</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </Modal>
      <Modal visible={showReview} animationType="slide">
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={retakePicture}>
                <Text style={styles.text}>Chụp lại</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={aiDetection}>
                <Text style={styles.text}>Nhận diện</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={ocrDetection}>
                <Text style={styles.text}>OCR</Text>
              </TouchableOpacity>
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
    borderRadius: 5,
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
