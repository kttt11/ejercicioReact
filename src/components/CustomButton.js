// CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.cajaBotton, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.TextoBoton}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cajaBotton: {
    backgroundColor: '#525FE1',
    borderRadius: 30,
    paddingVertical: 15,
    width: '100%', // Asegura que el botón ocupe todo el ancho
    marginTop: 20,

  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  TextoBoton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});

export default CustomButton;

