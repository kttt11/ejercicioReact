import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Camera } from "expo-camera";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

const ContadorScreen = () => {
  const [count, setCount] = useState(0);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [model, setModel] = useState(null);
  const cameraRef = useRef(null);
  const intervalRef = useRef(null); // Guardar referencia del setInterval

  // 🚀 Cargar modelo de detección de objetos al iniciar la app
  useEffect(() => {
    const loadModel = async () => {
      await tf.ready(); // Asegurar que TensorFlow.js está listo
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
      console.log("Modelo COCO-SSD cargado");
    };

    loadModel();

    // Limpiar el intervalo al desmontar el componente
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // 🔄 Detectar objetos en tiempo real
  const detectObjects = async () => {
    if (!cameraRef.current || !model) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: true }); // Capturar imagen
      const imageTensor = tf.browser.fromPixels(photo); // Convertir imagen a tensor
      const predictions = await model.detect(imageTensor); // Hacer predicciones

      console.log("Predicciones:", predictions);

      // Si detecta una persona haciendo push-ups, aumentar el contador
      const pushUpsDetected = predictions.some((pred) => pred.class === "person" && pred.score > 0.6);
      if (pushUpsDetected) {
        setCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error en la detección:", error);
    }
  };

  const handleCameraPress = async () => {
    if (cameraPermission === null) {
      console.log("Solicitando permisos de cámara...");
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");

      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Habilita la cámara en la configuración del dispositivo.");
        return;
      }
    }

    console.log("Activando cámara...");
    setIsCameraVisible(true);
  };

  const handleCameraReady = () => {
    console.log("Cámara lista!");
    setIsCameraReady(true);

    // Iniciar detección en tiempo real cada 2 segundos
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        detectObjects();
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PUSH UP COUNTER</Text>
      <Text style={styles.counterText}>
        CONTADOR: <Text style={styles.counter}>{count}</Text>
      </Text>

      <View style={styles.cameraContainer}>
        {isCameraVisible ? (
          isCameraReady ? (
            <Camera
              ref={cameraRef}
              style={styles.camera}
              type={Camera.Constants.Type.front}
              onCameraReady={handleCameraReady}
            />
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )
        ) : (
          <View style={styles.noCameraContainer}>
            <Text style={styles.noCameraText}>Presiona el botón para activar la cámara</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.cameraButton} onPress={handleCameraPress}>
        <Text style={styles.cameraIcon}>📷</Text>
      </TouchableOpacity>
    </View>
  );
};

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
