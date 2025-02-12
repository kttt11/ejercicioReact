import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';


const BodyScreen = () => {
 const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitas habilitar los permisos de la galería para usar esta función.');
      }

      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus.status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitas habilitar los permisos de la cámara para usar esta función.');
      }
    })();
  }, []);

  // Función para seleccionar una imagen desde la galería
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType.Images,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
        setAnalysisResult(''); // Limpia el resultado anterior
      } else {
        Alert.alert('Error', 'No se seleccionó ninguna imagen.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al intentar seleccionar la imagen.');
    }
  };

  // Función para tomar una foto con la cámara
  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaType.Images,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
        setAnalysisResult(''); // Limpia el resultado anterior
      } else {
        Alert.alert('Error', 'No se tomó ninguna foto.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al intentar tomar la foto.');
    }
  };

  // Función para enviar la imagen al backend FastAPI
  const analyzeBody = async () => {
    if (!selectedImage) {
      setAnalysisResult('Por favor, sube o toma una foto antes de analizar.');
      return;
    }

    try {
      setLoading(true);
      setAnalysisResult('Analizando imagen...');

      const formData = new FormData();
      formData.append('file', {
        uri: selectedImage,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      const response = await fetch('http://192.168.0.104:8000/analyze-body', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.status}`);
      }

      const data = await response.json();
      setAnalysisResult(`${data.body_type}. ${data.motivational_message}`);
    } catch (error) {
      setAnalysisResult('Error al analizar la imagen: ' + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para reiniciar la selección de imagen
  const resetImage = () => {
    setSelectedImage(null);
    setAnalysisResult('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>
          Hola, <Text style={styles.saludoStyle}>¡Bienvenido!</Text>
          {"\n"}
          ¿Quieres saber qué ejercicios son mejores para ti?
        </Text>

        <Text style={styles.instructionText}>¡Sube una foto o toma una foto para descubrirlo!</Text>

        <View style={styles.imageUploadContainer}>
          {selectedImage ? (
            <TouchableOpacity onPress={resetImage}>
              <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Subir Foto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <Text style={styles.buttonText}>Tomar Foto</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#09726F" />
        ) : (
          selectedImage && (
            <TouchableOpacity style={styles.button} onPress={analyzeBody}>
              <Text style={styles.buttonText}>Analizar tu cuerpo</Text>
            </TouchableOpacity>
          )
        )}

        {analysisResult ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{analysisResult}</Text>
          </View>
        ) : null}

        {analysisResult && (
          <TouchableOpacity style={styles.button} onPress={resetImage}>
            <Text style={styles.buttonText}>Subir otra foto</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

// **Estilos**
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  saludoStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#09726F',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  imageUploadContainer: {
    width: 200,
    height: 250,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#09726F',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    width: '80%',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BodyScreen;
