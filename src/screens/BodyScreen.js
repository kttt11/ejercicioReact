import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BodyScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const navigation = useNavigation();

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

      // Simulación de espera (aquí iría la llamada real a FastAPI)
      setTimeout(() => {
        setAnalysisResult('¡Análisis completado! Tipo de cuerpo: Atlético 💪');
      }, 2000);
    } catch (error) {
      setAnalysisResult('Error al analizar la imagen.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Mensaje superior izquierdo */}
        <Text style={styles.topText}>Veamos qué tipo de cuerpo tienes</Text>

        {/* Mensaje central */}
        <Text style={styles.instructionText}>Sube una foto de tu cuerpo completo aquí</Text>

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
  container: {
    flex: 1,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20, // Añade espacio horizontal
  },
  topText: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Asegura que el texto esté alineado a la izquierda
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

export default BodyScreen;
