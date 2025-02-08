import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";

const ContadorScreen = () => {
  const [count, setCount] = useState(0);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const cameraRef = useRef(null);

  // Pedimos permisos de cámara al cargar la pantalla
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  // Función para activar/desactivar la cámara
  const toggleCamera = () => {
    if (cameraPermission) {
      setIsCameraVisible((prev) => !prev);
    } else {
      Alert.alert("Permiso denegado", "No tienes acceso a la cámara.");
    }
  };

  // Cierra la cámara cuando el componente se desmonta
  useEffect(() => {
    return () => {
      setIsCameraVisible(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PUSH UP</Text>
      <Text style={styles.counterText}>
        CONTADOR: <Text style={styles.counter}>{count}</Text>
      </Text>

      <View style={styles.cameraContainer}>
        {isCameraVisible ? (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={Camera.Constants.Type.front}
            onCameraReady={() => console.log("📸 Cámara lista")}
          />
        ) : (
          <View style={styles.noCameraContainer}>
            <Text style={styles.noCameraText}>
              Presiona el botón para activar la cámara
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.cameraButton} onPress={toggleCamera}>
        <Text style={styles.cameraIcon}>{isCameraVisible ? "❌" : "📷"}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F8F8F8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  counterText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  counter: {
    fontSize: 24,
    color: "#333",
  },
  cameraContainer: {
    width: 300,
    height: 400,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  camera: {
    flex: 1, // Asegura que la cámara ocupe todo el espacio disponible
    width: "100%",
    height: "100%",
  },
  noCameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noCameraText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  cameraButton: {
    marginTop: 20,
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 50,
  },
  cameraIcon: {
    fontSize: 24,
    color: "#FFF",
  },
});

export default ContadorScreen;
