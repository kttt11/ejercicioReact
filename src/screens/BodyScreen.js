import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const BodyScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const [userName, setUserName] = useState('Usuario');
  const [motivationPhrase, setMotivationPhrase] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setUserName('¡Bienvenido, Atleta!');
    }, 500);
    fetchMotivationPhrase();
  }, []);

  const fetchMotivationPhrase = async () => {
    try {
      const response = await fetch('https://api.fisen.net/frases/random');
      const data = await response.json();
      setMotivationPhrase(data.frase + ' - ' + data.autor);
    } catch (error) {
      setMotivationPhrase('El éxito no es definitivo, el fracaso no es fatal: Lo que cuenta es el coraje para continuar. - Winston Churchill');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setAnalysisResult('');
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setAnalysisResult('');
    }
  };

  const analyzeBody = async () => {
    if (!selectedImage) {
      setAnalysisResult('Por favor, sube una imagen antes de analizar.');
      return;
    }

    try {
      setAnalysisResult('Analizando imagen...');
      const formData = new FormData();
      formData.append('file', {
        uri: selectedImage,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      setTimeout(() => {
        setAnalysisResult('¡Análisis completado! Tipo de cuerpo: Atlético 💪');
      }, 2000);
    } catch (error) {
      setAnalysisResult('Error al analizar la imagen.');
    }
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.greetingText}>{userName}</Text>
        <Text style={styles.motivationText}>{motivationPhrase}</Text>

        <Text style={styles.instructionText}>Carga una foto de tu cuerpo completo aquí</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.commonButton} onPress={pickImage}>
            <Ionicons name="cloud-upload" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.commonButton} onPress={takePhoto}>
            <Ionicons name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageUploadContainer}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
          ) : (
            <Text>No hay imagen seleccionada</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.commonButton}
          onPress={analyzeBody}
          disabled={!selectedImage}
        >
          <Text style={styles.buttonText}>Analizar</Text>
        </TouchableOpacity>

        {analysisResult ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{analysisResult}</Text>
          </View>
        ) : null}

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
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {modalContent === 'Comida' && 'Aquí te ofrecemos recomendaciones de comidas saludables.'}
              {modalContent === 'Vestimenta' && 'Te ayudamos a elegir la mejor ropa para tus entrenamientos.'}
              {modalContent === 'Ejercicios' && 'Consulta rutinas de ejercicios para mejorar tu cuerpo.'}
            </Text>
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// **Estilos**
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
});

export default BodyScreen;
