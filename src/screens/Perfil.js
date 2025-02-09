import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker'; // Asegúrate de instalar expo-image-picker

const Perfil = () => { // Eliminé `navigation` como prop, a menos que lo estés pasando desde otro componente
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');


  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitas habilitar los permisos de la galería para usar esta función.');
      }
    })();
  }, []);

  // Función para seleccionar una imagen desde la galería
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setAnalysisResult(''); // Limpiar resultado anterior
    }
  };

  // Función para enviar la imagen al backend FastAPI
  const analyzeBody = async () => {
    if (!selectedImage) {
      setAnalysisResult('Por favor, sube una imagen antes de analizar.');
      return;
    }

    try {
      setAnalysisResult('Analizando imagen...');

      // Aquí deberías hacer una solicitud a tu backend FastAPI
      const formData = new FormData();
      formData.append('file', {
        uri: selectedImage,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      // Simulación de llamada a FastAPI (reemplazar con la llamada real)
      // const response = await fetch('URL_DE_TU_API', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      // const data = await response.json();
      // setAnalysisResult(data.result);

      // Simulación de espera (aquí iría la llamada real a FastAPI)
      setTimeout(() => {
        setAnalysisResult('¡Análisis completado! Tipo de cuerpo: Atlético 💪');
      }, 2000);
    } catch (error) {
      setAnalysisResult('Error al analizar la imagen: ' + error.message);
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>
          Hola, <Text style={styles.saludoStyle}>¡Bienvenido!</Text>
          {"\n"}
          ¿Quieres saber qué ejercicios son mejores para ti?
        </Text>


        {/* Mensaje central */}
        <Text style={styles.instructionText}>¡Sube una foto de tu cuerpo completo y lo descubrirás!</Text>

        {/* Área de carga de imagen */}
        <View style={styles.imageUploadContainer}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
          ) : (
            <Button title="Subir Foto" onPress={pickImage} />
          )}
        </View>

        {/* Botón para analizar la imagen */}
        <Button title="Analizar tu cuerpo" onPress={analyzeBody} />

        {/* Cuadro para mostrar el resultado */}
        {analysisResult ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{analysisResult}</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

// **Estilos**
const styles = StyleSheet.create({
  safeArea: {  // Estilo para SafeAreaView
    flex: 1,
    backgroundColor: '#ffffff', // Asegura que el fondo del SafeAreaView sea blanco
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  saludoStyle: {
    fontSize: 28, // Tamaño más grande
    fontWeight: 'bold',
    color: '#09726F',
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Sombra ligera
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

export default Perfil;

