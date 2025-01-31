import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>¡Bienvenido al Asistente Virtual de Gimnasio!</Text>
      <Text style={styles.subtitle}>¿Qué te gustaría hacer hoy?</Text>

      <View style={styles.buttonContainer}>
        <Button 
          title="Ver Rutinas"
          onPress={() => navigation.navigate('WorkoutScreen')} 
        />
        <Button 
          title="Mi Perfil"
          onPress={() => navigation.navigate('ProfileScreen')} 
        />
        <Button 
          title="Ejercicios"
          onPress={() => navigation.navigate('EjerciciosScreen')} // Nombre correcto de la pantalla
        />
        <Button 
          title="Entrenar"
          onPress={() => navigation.navigate('EntrenarScreen')} // Nombre correcto de la pantalla
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default HomeScreen;
