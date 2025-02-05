// LoginScreen.js
import React, { useState } from 'react';
import { View, Alert, Text, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    navigation.navigate('Entrenar'); // Cambia 'Home' por el nombre correcto de tu pantalla de inicio
  };

  return (
    <View style={styles.padre}>
      <View style={styles.tarjeta}>
        <InputField placeholder="Correo Electrónico" value={email} onChangeText={setEmail} />
        <InputField placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        <CustomButton title="Ingresar" onPress={handleLogin} />
        <Text style={styles.link} onPress={() => navigation.navigate('Registro')}>
          ¿No tienes una cuenta? Regístrate aquí.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  padre: {
    flex: 1,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  link: {
    color: '#525FE1',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
