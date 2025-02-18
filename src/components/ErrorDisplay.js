import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorDisplay = ({ error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ffcccc',
    borderRadius: 5,
  },
  text: {
    color: '#cc0000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ErrorDisplay;