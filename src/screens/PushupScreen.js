import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const PushupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Push Up</Text>
      <View style={styles.imagePlaceholder}>
        <Image source={{ uri: "https://i.gifer.com/origin/83/833df348882dfb76dad4da58c843fa0b.gif" }} style={styles.image} />
      </View>
      <Text style={styles.description}>
        Consiste en recostarse boca abajo sobre el suelo y empujar con las manos para elevar el cuerpo hasta que los brazos queden estirados.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ContadorScreen")}>
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
