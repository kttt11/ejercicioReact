import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const PerfilUser = ({ navigation }) => {
  const [username, setUsername] = useState('Usuario Ejemplo');
  const [email, setEmail] = useState('usuario@example.com');

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios en el perfil
    alert('Perfil actualizado con éxito');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nombre de usuario" 
        value={username} 
        onChangeText={setUsername} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Correo electrónico" 
        value={email} 
        onChangeText={setEmail} 
      />
      <Button title="Guardar Cambios" onPress={handleSave} />
      <Text style={styles.link} onPress={() => navigation.goBack()}>
        Volver a la pantalla anterior
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  link: {
    color: 'blue',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default PerfilUser;