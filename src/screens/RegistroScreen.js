import React, { useState } from 'react';
import { View, Alert, Text, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Checkbox, IconButton } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import appFirebase from '../../credenciales'; // Asegúrate de que la ruta sea correcta
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Importa las funciones necesarias

const auth = getAuth(appFirebase); // Inicializa la autenticación

const RegistroScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleRegistro = async () => {
    // Validar campos
    if (!name || !lastName || !email || !age || !password || !acceptedTerms) {
      Alert.alert('Error', 'Por favor, completa todos los campos y acepta los términos y condiciones.');
      return;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    // Validar longitud de la contraseña
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      // Crear un nuevo usuario con email y contraseña
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Registro Exitoso', `Bienvenido/a ${name} ${lastName}!`);
      navigation.navigate('Ejercicios'); // Cambia 'Ejercicios' por el nombre correcto de tu pantalla de ejercicios
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message); // Muestra un mensaje de error si falla el registro
    }
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
      if (response.didCancel) {
        console.log('Usuario canceló la selección de imagen');
      } else if (response.error) {
        console.log('Error al seleccionar la imagen:', response.error);
      } else if (response.assets) {
        setProfileImage(response.assets[0].uri); // Asigna la URI de la imagen seleccionada
      }
    });
  };

  return (
    <View style={styles.padre}>
      <View style={styles.tarjeta}>
        <Text style={styles.title}>Registro</Text>

        {/* Botón para seleccionar imagen de perfil centrado */}
        <View style={styles.imageContainer}>
          <IconButton
            icon="camera"
            size={40}
            onPress={selectImage}
            style={styles.imageButton}
          />
        </View>
        
        {profileImage && (
          <Image source={{ uri: profileImage }} style={styles.avatar} />
        )}

        <TextInput
          label="Nombre"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
        
        <TextInput
          label="Apellido"
          value={lastName}
          onChangeText={setLastName}
          mode="outlined"
          style={styles.input}
        />
        
        <TextInput
          label="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
        />
        
        <TextInput
          label="Edad"
          value={age}
          onChangeText={(value) => {
            if (/^\d*$/.test(value)) { // Solo permite números
              setAge(value);
            }
          }}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
        
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={acceptedTerms ? 'checked' : 'unchecked'}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
            color="#6200ee" // Color del checkbox
          />
          <Text>Acepto los términos y condiciones</Text>
        </View>

        <Button 
          mode="contained" 
          onPress={handleRegistro} 
          disabled={!acceptedTerms} 
          style={{ marginTop: 20, backgroundColor: '#2196F3' }} // Color celeste para el botón
          labelStyle={{ color: '#FFFFFF' }} // Texto en blanco
        >
          Registrar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
   padre: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#fff'
   },
   tarjeta: {
     margin: 20,
     backgroundColor: '#fff',
     borderRadius: 20,
     width: '90%',
     paddingVertical: 30,
     paddingHorizontal: 20,
     shadowColor: '#000',
     shadowOffset: {
       width: 0,
       height: 2 
     },
     shadowOpacity: 0.25,
     shadowRadius: 4,
     elevation: 5 
   },
   title: {
     fontSize: 24,
     fontWeight: 'bold',
     textAlign: 'center',
     marginBottom: 20 
   },
   input: {
     marginBottom: 16 // Espaciado inferior para los campos de entrada
   },
   checkboxContainer: {
     flexDirection: 'row',
     alignItems: 'center',
     marginBottom: 16 // Espaciado inferior para el checkbox
   },
   imageContainer: {
     alignItems: 'center', // Centra el ícono en el contenedor
     marginBottom: 16,
   },
   imageButton: {
     backgroundColor: '#e0e0e0', // Color de fondo del botón para mayor visibilidad
   },
   avatar: {
     width: 100,
     height: 100,
     borderRadius: 50,
     alignSelf: 'center', // Centra el avatar en la vista
   }
});

export default RegistroScreen;
