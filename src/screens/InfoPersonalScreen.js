import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

const InfoPersonalScreen = () => {
  const [formData, setFormData] = useState({
    genero: "",
    edad: "",
    peso: "",
    altura: "",
    metaPeso: "",
  });

  const handleInputChange = (campo, valor) => {
    setFormData({ ...formData, [campo]: valor });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <View style={styles.container}>
      {/* Appbar Header */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() =>  navigation.goBack()} />
        <Appbar.Content title="Información Personal" style={styles.appbarTitle} />
      </Appbar.Header>

      <Text style={styles.title}>Completa tu perfil</Text>

      <View style={styles.formContainer}>
        {/* Selección de Género */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Género</Text>
          <Picker
            selectedValue={formData.genero}
            style={styles.picker}
            onValueChange={(valor) => handleInputChange("genero", valor)}
          >
            <Picker.Item label="Selecciona tu género" value="" />
            <Picker.Item label="Masculino" value="masculino" />
            <Picker.Item label="Femenino" value="femenino" />
          </Picker>
        </View>

        {/* Edad */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Edad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu edad"
            keyboardType="numeric"
            value={formData.edad}
            onChangeText={(valor) => handleInputChange("edad", valor)}
          />
        </View>

        {/* Peso */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu peso"
            keyboardType="numeric"
            value={formData.peso}
            onChangeText={(valor) => handleInputChange("peso", valor)}
          />
        </View>

        {/* Altura */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Altura (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu altura"
            keyboardType="numeric"
            value={formData.altura}
            onChangeText={(valor) => handleInputChange("altura", valor)}
          />
        </View>

        {/* Meta de Peso */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Meta de Peso (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu meta de peso"
            keyboardType="numeric"
            value={formData.metaPeso}
            onChangeText={(valor) => handleInputChange("metaPeso", valor)}
          />
        </View>
      </View>

      {/* Botón personalizado */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 30,
  },
  appbar: {
    backgroundColor: "#fff",
  },
  appbarTitle: {
    textAlign: "center",
    color: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 30,
    textAlign: "center",
    color: "#09726F",
  },
  formContainer: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#09726F",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    opacity: 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    opacity: 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#09726F", // Color de fondo
    borderRadius: 20, // Bordes redondeados
    paddingVertical: 15, // Espaciado vertical
    paddingHorizontal: 60, // Espaciado horizontal
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 10 }, // Desplazamiento de la sombra
    shadowOpacity: 0.5, // Opacidad de la sombra
    shadowRadius: 40, // Radio de la sombra
    elevation: 10, // Elevación para Android
  },
  buttonText: {
    color: "#fff", // Color del texto
    fontSize: 20, // Tamaño de la fuente
    textAlign: "center", // Centrar texto
    
  },
});

export default InfoPersonalScreen;