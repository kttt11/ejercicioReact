import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const PushupScreen = ({ route, navigation }) => {
  // Determinar si es Push Up o Press Militar
  const { exercise } = route.params || { exercise: "pushup" };

  // Datos de cada ejercicio
  const exercises = {
    pushup: {
      title: "Push Up",
      description:
        "Consiste en recostarse boca abajo sobre el suelo y empujar con las manos para elevar el cuerpo hasta que los brazos queden estirados.",
      image: "https://static.wixstatic.com/media/2edbed_8c01db116a174865aa48bd3a1b58e191~mv2.gif",
    },
    pressmilitar: {
      title: "Press Militar",
      description:
        "Un ejercicio enfocado en el desarrollo de los hombros. Se realiza levantando una barra o mancuernas por encima de la cabeza.",
      image: "https://fitcron.com/wp-content/uploads/2021/04/02871301-Dumbbell-Arnold-Press-II_Shoulders_720.gif",
    },
  };

  const { title, description, image } = exercises[exercise];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.imagePlaceholder}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity
        style={styles.button}
        // El siguiente código de navegación está desactivado por ahora
        // onPress={() => navigation.navigate("Contador")}
      >
        <Text style={styles.buttonText}>Entrenar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F8F8F8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#666",
  },
  button: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PushupScreen;
