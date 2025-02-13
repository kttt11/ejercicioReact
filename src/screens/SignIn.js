import * as React from 'react';
import { View, Image, Alert } from 'react-native';
import { TextInput, Button, Checkbox, Text, Appbar } from 'react-native-paper';
import { auth } from '../../credenciales'; // Ahora importas desde firebaseConfig.js
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importa correctamente

const logo = require('../../assets/LogoHomeV2.png'); // Importa el logo

const SignIn = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const handleLogin = async () => {
    // Validar entradas
    if (!validateInputs()) {
      return; // Si hay errores de validación, no continuar
    }

    if (!termsAccepted) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones para continuar.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password); // Llama a Firebase para iniciar sesión
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
      navigation.navigate('Perfil'); // Navega a la pantalla Ejercicios
    } catch (error) {
      console.error(error);
      Alert.alert('Error usuario o contraseña mal ingresados'); // Muestra un mensaje de error si falla el inicio de sesión
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Por favor, ingresa un correo electrónico válido.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#FFFFFF' }}>
      {/*<Appbar style={{ backgroundColor: 'transparent', elevation: 0 }}>
        <Appbar.Content title="SIGMAGYM" titleStyle={{ textAlign: 'center', flexGrow: 1, fontWeight: 'bold' }} />
      </Appbar> */}

      {/* Logo */}
      <Image source={logo} style={{ width: 400, height: 250, alignSelf: 'center' }} resizeMode="contain" />

      <TextInput
        label="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        error={!!emailError}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />
      {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}

      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={!!passwordError}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />
      {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Checkbox
          status={rememberMe ? 'checked' : 'unchecked'}
          onPress={() => {
            setRememberMe(!rememberMe);
          }}
        />
        <Text>Recuérdame</Text>
      </View>

      {/* Checkbox para aceptar términos y condiciones */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Checkbox
          status={termsAccepted ? 'checked' : 'unchecked'}
          onPress={() => {
            setTermsAccepted(!termsAccepted);
          }}
        />
        <Text>Acepto los términos y condiciones</Text>
      </View>

      {/* Botón de Ingresar con color celeste */}
      <Button
        mode="contained"
        onPress={handleLogin} // Llama a handleLogin en lugar de navegar directamente
        style={{ marginBottom: 16, backgroundColor: '#09726F' }} // Color celeste
      >
        Ingresar
      </Button>

      {/* Botón para olvidaste la contraseña */}
      <Button
        mode="text"
        onPress={() => alert('Recuperar contraseña')}
        style={{ marginBottom: 16 }}
      >
        ¿Olvidaste tu contraseña?
      </Button>

      {/* Botones para Google y Facebook */}
      <Button
        mode="outlined"
        onPress={() => alert('Iniciar sesión con Google')}
        style={{ marginBottom: 8 }}
      >
        Iniciar sesión con Google
      </Button>

      <Button
        mode="outlined"
        onPress={() => alert('Iniciar sesión con Facebook')}
      >
        Iniciar sesión con Facebook
      </Button>

      <Text style={{ textAlign: 'center', marginTop: 16 }}>
        ¿No tienes una cuenta?{' '}
        <Text onPress={() => navigation.navigate('RegistroAdicional')} style={{ color: '#2196F3' }}>
          Regístrate aquí.
        </Text>
      </Text>
    </View>
  );
};

export default SignIn;
