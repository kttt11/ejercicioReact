import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EntrenarScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Entrenamiento</Text>
      </View>

      {/* Espaciado adicional después del título */}
      <View style={styles.spacing} />
      
      {/* Ilustración de cabecera */}
      <Image
        source={{ uri: "https://i.etsystatic.com/13221305/r/il/70e1af/1765869258/il_570xN.1765869258_3lbp.jpg" }}
        style={styles.mainIcon}
      />

      {/* Título dinámico */}
      <Text style={styles.title}>Elige tu entrenamiento</Text>

      {/* Sección de ejercicios con animaciones y mejor diseño */}
      <View style={styles.exerciseList}>
        <TouchableOpacity
          style={styles.exerciseCard}
          onPress={() => navigation.navigate("Pushup", { exercise: "pushup" })}
        >
          <Image
            source={{ uri: "https://static.strengthlevel.com/images/exercises/push-ups/push-ups-800.jpg" }}
            style={styles.exerciseImage}
          />
          <Text style={styles.exerciseText}>Push Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exerciseCard}
          onPress={() => navigation.navigate("Pushup", { exercise: "pressmilitar" })}
        >
          <Image
            source={{ uri: "https://static.strengthlevel.com/images/exercises/seated-dumbbell-shoulder-press/seated-dumbbell-shoulder-press-800.jpg" }}
            style={styles.exerciseImage}
          />
          <Text style={styles.exerciseText}>Press Militar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f5",
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
  exerciseList: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  exerciseCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    transform: [{ scale: 1 }],
  },
  exerciseImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  exerciseText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    color: "#444",
  },
});

export default EntrenarScreen;
