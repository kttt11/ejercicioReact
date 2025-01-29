// RegistroScreen.js
import React, { useState } from 'react';
import { View, Alert, Text, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { CheckBox } from 'react-native-elements'; // Asegúrate de tenerlo instalado

const RegistroScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleRegistro = () => {
    if (!name || !lastName || !email || !age || !password || !acceptedTerms) {
      Alert.alert('Error', 'Por favor, completa todos los campos y acepta los términos y condiciones.');
      return;
    }

    Alert.alert('Registro Exitoso', `Bienvenido/a ${name} ${lastName}!`);
    navigation.navigate('Login'); // Cambia 'Login' por el nombre correcto de tu pantalla de inicio de sesión
  };

  return (
    <View style={styles.padre}>
      <View style={styles.tarjeta}>
        <Text style={styles.title}>Registro</Text>
        <InputField placeholder="Nombre" value={name} onChangeText={setName} />
        <InputField placeholder="Apellido" value={lastName} onChangeText={setLastName} />
        <InputField placeholder="Correo Electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <InputField placeholder="Edad" value={age} onChangeText={setAge} keyboardType="numeric" />
        <InputField placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />

        <CheckBox
          title="Acepto los términos y condiciones"
          checked={acceptedTerms}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
          containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
        />

        <CustomButton title="Registrar" onPress={handleRegistro} disabled={!acceptedTerms} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
   padre:{
     flex :1 ,
     justifyContent:'center' ,
     alignItems:'center' ,
     backgroundColor:'#fff'
   },
   tarjeta:{
     margin :20 ,
     backgroundColor:'#fff' ,
     borderRadius :20 ,
     width :'90%' ,
     paddingVertical :30 , // Aumenta el padding para más espacio vertical
     paddingHorizontal :20 , // Padding horizontal para un mejor espaciado
     shadowColor:'#000' ,
     shadowOffset:{
       width :0 ,
       height :2 
     },
     shadowOpacity :0.25 ,
     shadowRadius :4 ,
     elevation :5 
   },
   title:{
     fontSize :24 ,
     fontWeight:'bold',
     textAlign:'center',
     marginBottom :20 
   }
});

export default RegistroScreen;

