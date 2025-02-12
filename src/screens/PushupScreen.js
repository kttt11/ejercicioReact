import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Image } from 'expo-image'; // Importar desde expo-image

const PushupScreen = ({ route, navigation }) => {
  const { exercise } = route.params || { exercise: "pushup" };

  const exercises = {
    pushup: {
      title: "Push Up",
      description:
        "Recuestate boca abajo y empuja con las manos para elevar el cuerpo hasta estirar los brazos.",
      image: require("../../assets/Pushup.gif"), // Usando require para el gif local
    },
    pressmilitar: {
      title: "Press Militar",
      description:
        "Ejercicio para hombros, levantando una barra o mancuernas por encima de la cabeza.",
      image: require("../../assets/Prees-Militar.gif"), // Corregido (image con minúscula)
    },
  };

  const { title, description, image } = exercises[exercise];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rutina de Entrenamiento</Text>
      </View>

      {/* Espaciado adicional después del encabezado */}
      <View style={styles.spacing} />

      {/* Título dinámico */}
      <Text style={styles.title}>{title}</Text>

      {/* Imagen del ejercicio usando expo-image */}
      <Image source={image} style={styles.image} />

      {/* Descripción del ejercicio */}
      <Text style={styles.description}>{description}</Text>

      {/* Botón para comenzar entrenamiento */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrenar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#fff", // Fondo blanco
    paddingTop: 0,
    paddingBottom: 20,
  },
  header: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#09726F", // Verde oscuro
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // Texto blanco en el encabezado
  },
  spacing: {
    height: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#c88f00", // Color dorado suave para el título
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    textAlign: "center",
    fontSize: 18,
    color: "#555", // Gris oscuro para la descripción
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#09726F", // Botón verde oscuro
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF", // Texto blanco en el botón
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default PushupScreen;
