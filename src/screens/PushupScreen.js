import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const PushupScreen = ({ route, navigation }) => {
  const { exercise } = route.params || { exercise: "pushup" };

  const exercises = {
    pushup: {
      title: "Push Up",
      description:
        "Recóstate boca abajo y empuja con las manos para elevar el cuerpo hasta estirar los brazos.",
      image: "https://static.wixstatic.com/media/2edbed_8c01db116a174865aa48bd3a1b58e191~mv2.gif",
    },
    pressmilitar: {
      title: "Press Militar",
      description:
        "Ejercicio para hombros, levantando una barra o mancuernas por encima de la cabeza.",
      image: "https://fitcron.com/wp-content/uploads/2021/04/02871301-Dumbbell-Arnold-Press-II_Shoulders_720.gif",
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

      {/* Imagen del ejercicio */}
      <Image source={{ uri: image }} style={styles.image} />

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
    backgroundColor: "#F0F0F5",
    paddingTop: 0,
    paddingBottom: 20,
  },
  header: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#333",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  spacing: {
    height: 20,
  },
  mainIcon: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
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
    color: "#555",
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#171616",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default PushupScreen;
