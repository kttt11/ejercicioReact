// InputField.js
import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const InputField = ({ placeholder, value, onChangeText, secureTextEntry = false }) => {
  return (
    <View style={styles.cajaTexto}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#999" // Color del texto del placeholder
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cajaTexto: {
    width: '100%',
    backgroundColor: '#cccccc40',
    borderRadius: 30,
    marginBottom: 20,
  },
  input: {
    paddingHorizontal: 15,
    width: '100%',
    height: 50,
  },
});

export default InputField;

