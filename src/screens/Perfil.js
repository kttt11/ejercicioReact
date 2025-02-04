import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Perfil = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcomeText}>¡Bienvenido a GymBro!</Text>
        <Text style={styles.subtitle}>¿Qué te gustaría hacer hoy?</Text>

        <View style={styles.buttonContainer}>
          {/* Botón para Ver Rutinas */}
          <View style={styles.buttonWrapper}>
            <Button
              title="Ver Rutinas"
              onPress={() => navigation.navigate('WorkoutScreen')}
            />
          </View>

          {/* Botón para Mi Perfil */}
          <View style={styles.buttonWrapper}>
            <Button
              title="Mi Perfil"
              onPress={() => navigation.navigate('ProfileScreen')}
            />
          </View>

          {/* Botón para Ejercicios */}
          <View style={styles.buttonWrapper}>
            <Button
              title="Ejercicios"
              onPress={() => navigation.navigate('EjerciciosScreen')}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              title="TU CUERPO"
              onPress={() => navigation.navigate('BodyScreen')}
            />
          </View>

          {/* Botón para Chatear con Asistente */}
          <View style={styles.buttonWrapper}>
            <Button
              title="Chatea con tu asistente personal"
              onPress={() => navigation.navigate('ChatAssistantScreen')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  },
  buttonWrapper: {
    marginVertical: 10, // Espaciado entre botones
  },
});

export default Perfil;
