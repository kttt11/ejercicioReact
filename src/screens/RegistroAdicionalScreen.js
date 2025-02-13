import React, { useState } from 'react';
import { View, Alert, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import appFirebase from '../../credenciales';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

const RegistroAdicionalScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState(null);
  const [birthDate, setBirthDate] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [openGender, setOpenGender] = useState(false);
  const [genderOptions, setGenderOptions] = useState([
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Femenino', value: 'Femenino' },
  ]);

  const handleRegistro = async () => {
    if (!name || !lastName || !email || !password || !gender || !birthDate || !weight || !height || !acceptedTerms) {
      Alert.alert('Error', 'Por favor, completa todos los campos y acepta los términos y condiciones.');
      return;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    Alert.alert(
      'Confirmación',
      '¿Deseas proceder con el registro?',
      [
        {
          text: 'NO',
          style: 'cancel',
        },
        {
          text: 'SI',
          onPress: async () => {
            try {
              // Verificar si el correo ya está registrado
              const signInMethods = await fetchSignInMethodsForEmail(auth, email);
              if (signInMethods.length > 0) {
                Alert.alert(
                  'Correo ya registrado',
                  'Este correo ya está asociado a una cuenta. ¿Quieres iniciar sesión?',
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Iniciar sesión', onPress: () => navigation.navigate('SignIn') },
                  ]
                );
                return;
              }

              // Crear un nuevo usuario con email y contraseña
              const userCredential = await createUserWithEmailAndPassword(auth, email, password);
              const uid = userCredential.user.uid;

              // Guardar datos adicionales en Firestore
              await setDoc(doc(db, 'users', uid), {
                name,
                lastName,
                email,
                gender,
                birthDate,
                weight: parseFloat(weight),
                height: parseFloat(height),
                profileImage: profileImage || null,
              });

              Alert.alert(
                'Registro Exitoso',
                `Bienvenido/a ${name} ${lastName}!`,
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      // Limpieza de los campos del formulario
                      setName('');
                      setLastName('');
                      setEmail('');
                      setPassword('');
                      setGender(null);
                      setBirthDate('');
                      setWeight('');
                      setHeight('');
                      setAcceptedTerms(false);
                      setProfileImage(null);

                      // Redirección a SignIn
                      navigation.navigate('SignIn');
                    },
                  },
                ]
              );
            } catch (error) {
              console.error(error);
              if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Error', 'El correo ya está registrado. Por favor, utiliza otro correo.');
              } else {
                Alert.alert('Error', error.message);
              }
            }
          },
        },
      ]
    );
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
      if (!response.didCancel && !response.error && response.assets) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} scrollEnabled={!openGender}>
      <View style={styles.tarjeta}>
        <Text style={styles.title}>Registro</Text>

        {/* Imagen de Perfil */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={selectImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
              <Image source={require('../../assets/sigmaLogo.png')} style={styles.avatar} />
            )}
          </TouchableOpacity>
        </View>

        {/* Datos Principales */}
        <TextInput label="Nombre" value={name} onChangeText={setName} mode="outlined" style={styles.input} />
        <TextInput label="Apellido" value={lastName} onChangeText={setLastName} mode="outlined" style={styles.input} />
        <TextInput label="Correo Electrónico" value={email} onChangeText={setEmail} mode="outlined" style={styles.input} keyboardType="email-address" />
        <TextInput label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry mode="outlined" style={styles.input} />

        {/* Datos Adicionales */}
        <Text style={styles.subTitle}>Datos Adicionales</Text>

        {/* Selector de Género */}
        <DropDownPicker
          open={openGender}
          value={gender}
          items={genderOptions}
          setOpen={setOpenGender}
          setValue={setGender}
          setItems={setGenderOptions}
          placeholder="Seleccione su género"
          style={styles.dropdown}
          zIndex={3000}
        />

        <TextInput label="Fecha de Nacimiento (YYYY-MM-DD)" value={birthDate} onChangeText={setBirthDate} mode="outlined" style={styles.input} />
        <TextInput label="Peso (kg)" value={weight} onChangeText={(value) => setWeight(value.replace(/[^0-9.]/g, ''))} mode="outlined" keyboardType="numeric" style={styles.input} />
        <TextInput label="Altura (cm)" value={height} onChangeText={(value) => setHeight(value.replace(/[^0-9.]/g, ''))} mode="outlined" keyboardType="numeric" style={styles.input} />

        {/* Aceptar términos */}
        <View style={styles.checkboxContainer}>
          <Checkbox status={acceptedTerms ? 'checked' : 'unchecked'} onPress={() => setAcceptedTerms(!acceptedTerms)} />
          <TouchableOpacity onPress={() => navigation.navigate('TerminosCondiciones')}>
            <Text style={styles.termsText}>Acepto los términos y condiciones</Text>
          </TouchableOpacity>
        </View>

        <Button mode="contained" onPress={handleRegistro} style={styles.button} labelStyle={{ color: '#fff' }}>
          Registrar
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tarjeta: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    shadowColor: '#000',
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  input: {
    marginBottom: 16,
  },
  dropdown: {
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  termsText: {
    textDecorationLine: 'underline',
    color: '#007AFF',
    marginLeft: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#09726F',
  },
});

export default RegistroAdicionalScreen;