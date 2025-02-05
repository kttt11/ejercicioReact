import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EntrenarScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hey, Karol</Text>
        <Ionicons name="person-circle-outline" size={30} color="black" />
      </View>

      {/* Sección de ejercicios */}
      <Text style={styles.title}>Ejercicios</Text>
      <Image
        source={{
          uri: "https://i.etsystatic.com/13221305/r/il/70e1af/1765869258/il_570xN.1765869258_3lbp.jpg",
        }}
        style={styles.icon}
      />
      <Text style={styles.subtitle}>Entrenar</Text>

      {/* Botón de Push UP */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Pushup", { exercise: "pushup" })}
        >
          <Text style={styles.buttonText}>Push UP</Text>
        </TouchableOpacity>
        <Image
          source={{
            uri: "https://static.strengthlevel.com/images/exercises/push-ups/push-ups-800.jpg",
          }}
          style={styles.image}
        />
      </View>

      {/* Botón de Press Militar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Pushup", { exercise: "pressmilitar" })}
        >
          <Text style={styles.buttonText}>Press Militar</Text>
        </TouchableOpacity>
        <Image
          source={{
            uri: "https://www.deportrainer.com/img/cms/Post%20de%20blog/ejercicios_hombro/ejercicio-press-militar-con-barra-sentado.jpg",
          }}
          style={styles.image}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    width: "100%",
  },
  icon: {
    width: 120,
    height: 120,
    marginVertical: 20,
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: "65%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginLeft: 10,
  },
});

export default EntrenarScreen;
