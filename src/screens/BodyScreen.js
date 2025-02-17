import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, ActivityIndicator, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const API_URL = "http://192.168.255.176:8000/analyze-body/"; 

const BodyScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [recommendations, setRecommendations] = useState({
    ejercicios: [],
    alimentacion_definicion: [],
    alimentacion_volumen: [],
    vestimenta: '',
  });

  useEffect(() => {
    requestPermissions();
  }, []);

  // 🔹 Solicitar permisos de galería y cámara
  const requestPermissions = async () => {
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

    if (galleryStatus !== 'granted') {
      Alert.alert('Permiso denegado', 'Debes permitir acceso a la galería en ajustes.');
    }
    if (cameraStatus !== 'granted') {
      Alert.alert('Permiso denegado', 'Debes permitir acceso a la cámara en ajustes.');
    }
  };

  // 🔹 Seleccionar Imagen desde Galería
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setSelectedImage(result.assets[0].uri);
      setAnalysisResult('');
    } else {
      Alert.alert('Error', 'No se seleccionó ninguna imagen.');
    }
    
  };

  // 🔹 Tomar Foto con la Cámara
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setSelectedImage(result.assets[0].uri);
      setAnalysisResult('');
    } else {
      Alert.alert('Error', 'No se tomó ninguna foto.');
    }
  };

  // 🔹 Analizar el Cuerpo con FastAPI (Integración mejorada)
  const analyzeBody = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Por favor, sube una imagen antes de analizar.');
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

      console.log("🔄 Enviando imagen a:", API_URL);

      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });

      console.log("✅ Respuesta completa del servidor:", response.data);

      if (response.status === 200) {
        const { body_type, recommendations } = response.data;

        console.log("📌 Recomendaciones recibidas:", recommendations);

        setAnalysisResult(`¡Análisis completado! Tipo de cuerpo: ${body_type}`);

        // ✅ Verifica que recommendations no sea null antes de asignar
        setRecommendations({
          ejercicios: recommendations?.ejercicios || [],
          alimentacion_definicion: recommendations?.alimentacion_definicion || [],
          alimentacion_volumen: recommendations?.alimentacion_volumen || [],
          vestimenta: recommendations?.vestimenta || '',
        });

      } else {
        setAnalysisResult(`⚠️ Error en el análisis: ${response.data.detail}`);
      }
    } catch (error) {
      console.error("❌ Error en análisis:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Abrir Modal con Información de Recomendaciones
  const openModal = (category) => {
    let content = '';
    if (category === 'Comida') {
      content = `Definición: ${recommendations.alimentacion_definicion.join(', ')}\n\nVolumen: ${recommendations.alimentacion_volumen.join(', ')}`;
    } else if (category === 'Vestimenta') {
      content = recommendations.vestimenta;
    } else if (category === 'Entrenamiento') {
      content = recommendations.ejercicios.join(', ');
    }
    setModalContent(content);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>¡Bienvenido! Analiza tu cuerpo</Text>

        {/* Botones para subir/tomar foto */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.commonButton} onPress={pickImage}>
            <Ionicons name="cloud-upload" size={18} color="#fff" />
            <Text style={styles.buttonText}>Subir Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commonButton} onPress={takePhoto}>
            <Ionicons name="camera" size={18} color="#fff" />
            <Text style={styles.buttonText}>Tomar Foto</Text>
          </TouchableOpacity>
        </View>

        {/* Mostrar Imagen Seleccionada */}
        <View style={styles.imageUploadContainer}>
          {selectedImage ? <Image source={{ uri: selectedImage }} style={styles.uploadedImage} /> : <Text>No hay imagen seleccionada</Text>}
        </View>

        {/* Botón de Análisis */}
        <TouchableOpacity style={styles.commonButton} onPress={analyzeBody} disabled={!selectedImage}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Analizar</Text>}
        </TouchableOpacity>

        {/* Resultado del Análisis */}
        <Text style={styles.resultText}>{analysisResult}</Text>

        {/* Cuadros de información */}
        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.infoBox} onPress={() => openModal('Comida')}>
            <Ionicons name="restaurant" size={18} color="#000" />
            <Text style={styles.infoText}>Comida</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoBox} onPress={() => openModal('Vestimenta')}>
            <Ionicons name="shirt" size={18} color="#000" />
            <Text style={styles.infoText}>Vestuario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoBox} onPress={() => openModal('Entrenamiento')}>
            <Ionicons name="barbell" size={18} color="#000" />
            <Text style={styles.infoText}>Entrenar</Text>
          </TouchableOpacity>
        </View>

        {/* Modal con Recomendaciones */}
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{modalContent}</Text>
              <TouchableOpacity style={styles.buttonCerrar} onPress={() => setModalVisible(false)} >
            <Text style={styles.buttonCerrarText}>Cerrar</Text> 
            </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  motivationText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  commonButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#09726F',
    marginVertical: 8,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  infoBox: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#09726F',
    borderWidth: 1,
    borderRadius: 40,
   
  },
  infoText: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonCerrar: {
    backgroundColor: '#09726F ',
  },
  buttonCerrarText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
  },
});

export default BodyScreen;