import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EntrenarScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Encabezado con el nombre del usuario y un icono de perfil */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hey, Karol</Text>
        <Ionicons name="person-circle-outline" size={24} color="black" />
      </View>
      
      {/* Sección de ejercicios con imagen y navegación */}
      <TouchableOpacity onPress={() => navigation.navigate('EntrenarScreen')}>
        <Text style={styles.title}>Ejercicios</Text>
      </TouchableOpacity>
      <Image 
        source={{ uri: 'https://i.etsystatic.com/13221305/r/il/70e1af/1765869258/il_570xN.1765869258_3lbp.jpg' }} 
        style={styles.icon} 
      />
      
      <Text style={styles.subtitle}>Entrenar</Text>
      
      {/* Botón de Push UP con imagen personalizada y navegación */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EntrenarScreen')}>
          <Text style={styles.buttonText}>Push UP</Text>
        </TouchableOpacity>
        <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/007/731/236/non_2x/boy-doing-push-up-exercise-on-a-floor-mat-illustration-man-doing-push-ups-for-body-strength-and-muscle-buildup-bodybuilder-flat-character-design-doing-push-up-exercise-vector.jpg' }} style={styles.image} />
      </View>
      
      {/* Botón de Press Militar con imagen personalizada y navegación */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EntrenarScreen')}>
          <Text style={styles.buttonText}>Press Militar</Text>
        </TouchableOpacity>
        <Image source={{ uri: 'https://www.deportrainer.com/img/cms/Post%20de%20blog/ejercicios_hombro/ejercicio-press-militar-con-barra-sentado.jpg' }} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Color de fondo corregido
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});

export default EntrenarScreen;