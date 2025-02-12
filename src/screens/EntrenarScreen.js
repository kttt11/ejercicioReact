import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";

const EntrenarScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Imagen superior */}
        <View style={styles.iconContainer}>
            <Image source={require("../../assets/EntrenarIcono.png")} style={styles.iconImage} />
        </View>

        {/* Título principal */}
        <Text style={styles.title}>Empieza a entrenar</Text>

        {/* Ejercicios */}
        <View style={styles.exerciseContainer}>
          {/* Ejercicio 1: Push Up */}
          <View style={styles.exercise}>
            <Image
              source={{
                uri: "https://static.strengthlevel.com/images/exercises/push-ups/push-ups-800.jpg",
              }}
              style={styles.exerciseImage}
            />
            <View style={styles.exerciseContent}>
              <TouchableOpacity
                style={styles.exerciseButton}
                onPress={() => navigation.navigate("Pushup", { exercise: "pushup" })}
              >
                <Text style={styles.exerciseButtonText}>Push UP</Text>
              </TouchableOpacity>
              <Text style={styles.exerciseDescription}>
                Consiste en bajar y subir el cuerpo con los brazos desde una posición de plancha.
              </Text>
            </View>
          </View>

          {/* Ejercicio 2: Press Militar */}
          <View style={styles.exercise}>
            <Image
              source={{
                uri: "https://static.strengthlevel.com/images/exercises/seated-dumbbell-shoulder-press/seated-dumbbell-shoulder-press-800.jpg",
              }}
              style={styles.exerciseImage}
            />
            <View style={styles.exerciseContent}>
              <TouchableOpacity
                style={styles.exerciseButton}
                onPress={() => navigation.navigate("Pushup", { exercise: "pressmilitar" })}
              >
                <Text style={styles.exerciseButtonText}>Press Militar</Text>
              </TouchableOpacity>
              <Text style={styles.exerciseDescription}>
              Un ejercicio de fuerza para los hombros donde se empuja una barra o mancuernas desde la altura de los hombros hasta la extensión completa de los brazos sobre la cabeza.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  appbar: {
    backgroundColor: "white",
    elevation: 5,
  },
  appbarTitle: {
    textAlign: "center",
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 60,
    color: "#000",
  },
  exerciseContainer: {
    flexDirection: "column",
    gap: 20,
  },
  exercise: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 35,
  },
  exerciseImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  exerciseContent: {
    flex: 1,
    marginLeft: 20,
  },
  exerciseButton: {
    backgroundColor: "#09726F",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius:  19,
    alignItems: "center",
    marginBottom: 15,
  },
  exerciseButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  exerciseDescription: {
    fontSize: 14,
    color: "#555",
    textAlign: "justify",
  },
});

export default EntrenarScreen;