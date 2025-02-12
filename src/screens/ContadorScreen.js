import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

export default function ExerciseCounter() {
  const [hasPermission, setHasPermission] = useState(null);
  const [detector, setDetector] = useState(null);
  const [count, setCount] = useState(0);
  const [isDetecting, setIsDetecting] = useState(false);
  const [keypoints, setKeypoints] = useState([]);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    async function loadModel() {
      await tf.ready();
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.BlazePose,
        {
          runtime: 'tfjs',
        }
      );
      setDetector(detector);
      console.log('Modelo cargado');
    }

    loadModel();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      console.log("Permisos de cámara:", status === 'granted');
    })();
  }, []);

  const captureAndProcessImage = async () => {
    if (!cameraRef.current || !detector) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setImage(photo.uri);

      const img = new Image();
      img.src = `data:image/jpeg;base64,${photo.base64}`;

      img.onload = async () => {
        const tensor = tf.browser.fromPixels(img);
        const poses = await detector.estimatePoses(tensor);

        if (poses.length > 0) {
          const pose = poses[0].keypoints;
          console.log("Puntos detectados:", pose);
          setKeypoints(pose);
          setCount((prevCount) => prevCount + 1);
        }
      };
    } catch (error) {
      console.error("Error en la detección:", error);
    }
  };

  const startDetection = () => {
    setIsDetecting(true);
    const interval = setInterval(captureAndProcessImage, 1000); // Captura cada 1 segundo
    return () => clearInterval(interval);
  };

  const stopDetection = () => {
    setIsDetecting(false);
    setCount(0);
    console.log("Detección detenida");
  };

  if (hasPermission === null) {
    return <Text>Solicitando permisos de cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se pueden obtener permisos de cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={cameraRef}>
        <View style={styles.overlay}>
          <Text style={styles.count}>Repeticiones: {count}</Text>
          <Button title="Iniciar" onPress={startDetection} />
          <Button title="Detener" onPress={stopDetection} />
        </View>
      </Camera>
      {image && <Image source={{ uri: image }} style={styles.preview} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  count: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
