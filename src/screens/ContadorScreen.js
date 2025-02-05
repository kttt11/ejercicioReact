import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ContadorScreen = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PUSH UP</Text>
      <Text style={styles.counterText}>
        CONTADOR: <Text style={styles.counter}>{count}</Text>
      </Text>

      {/* Aquí iría la lógica para el contador o cualquier funcionalidad adicional */}

      <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
        <Text style={styles.buttonText}>Aumentar contador</Text>
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
  counterText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  counter: {
    fontSize: 24,
    color: "#333",
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

export default ContadorScreen;
