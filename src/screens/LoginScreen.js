import * as React from 'react';
import { View, Image, Alert, StyleSheet } from 'react-native';
import { TextInput, Button, Checkbox, Text } from 'react-native-paper';
import { auth } from '../../firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 


const logo = require('../../assets/LogoHomeV2.png'); // Importa el logo

const LoginScreen = ({ navigation }) => {
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
      navigation.navigate('Body'); // Navega a la pantalla Ejercicios
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
    <View style={styles.container}>
      {/* Logo */}
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <TextInput
        label="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        error={!!emailError}
        mode="outlined"
        style={styles.input}
        theme={{
          colors: {
            primary: 'black',    // Color del borde del Input
            background: 'white', // Fondo blanco del Input
          },
        }}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={!!passwordError}
        mode="outlined"
        style={styles.input}
        theme={{
          colors: {
            primary: 'black',    // Color del borde del Input
            background: 'white', // Fondo blanco del Input
          },
        }}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={rememberMe ? 'checked' : 'unchecked'}
          onPress={() => {
            setRememberMe(!rememberMe);
          }}
          color="#09726F" // Cambiar el color del checkbox a verde
        />
        <Text>Recuérdame</Text>
      </View>

      {/* Checkbox para aceptar términos y condiciones */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={termsAccepted ? 'checked' : 'unchecked'}
          onPress={() => {
            setTermsAccepted(!termsAccepted);
          }}
          color="#09726F" // Cambiar el color del checkbox a verde
        />
        <Text>Acepto los términos y condiciones</Text>
      </View>

      {/* Botón de Ingresar con borde negro */}
      <Button
        mode="contained"
        onPress={handleLogin} // Llama a handleLogin en lugar de navegar directamente
        style={styles.button}
      >
        Ingresar
      </Button>

      {/* Botón para olvidaste la contraseña */}
      <Button
        mode="text"
        onPress={() => alert('Recuperar contraseña')}
        style={styles.textButton}
      >
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </Button>

      {/* Botones para Google y Facebook */}
      <Button
        mode="outlined"
        onPress={() => alert('Iniciar sesión con Google')}
        style={styles.outlinedButton}
      >
        Iniciar sesión con Google
      </Button>

      <Button
        mode="outlined"
        onPress={() => alert('Iniciar sesión con Facebook')}
        style={styles.outlinedButton}
      >
        Iniciar sesión con Facebook
      </Button>

      <Text style={styles.signupText}>
        ¿No tienes una cuenta?{' '}
        <Text onPress={() => navigation.navigate('Registro')} style={styles.signupLink}>
          Regístrate aquí.
        </Text>
      </Text>
    </View>
  );
};

// Estilos definidos con StyleSheet.create
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 400,
    height: 250,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
    backgroundColor: '#09726F',  // Fondo celeste
    borderWidth: 1,              // Borde negro
    borderColor: 'black',        // Borde negro
  },
  textButton: {
    marginBottom: 16,
  },
  outlinedButton: {
    marginBottom: 8,
    borderColor: 'black', // Borde negro
    backgroundColor: 'white', // Fondo blanco
  },
  forgotPasswordText: {
    color: 'black', // Cambiar texto del botón a negro
  },
  signupText: {
    textAlign: 'center',
    marginTop: 16,
  },
  signupLink: {
    color: '#09726F',
  },
});

export default LoginScreen;
