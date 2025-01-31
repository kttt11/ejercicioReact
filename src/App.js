// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen'; 
import HomeScreen from './screens/HomeScreen'; 
import RegistroScreen from './screens/RegistroScreen';
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import EntrenarScreen from './screens/EntrenarScreen';
import ContadorScreen from './screens/ContadorScreen';
import PushupScreen from './screens/PushupScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Entrenar" component={EntrenarScreen} />
        <Stack.Screen name="Pushup" component={PushupScreen} />
        <Stack.Screen name="Contador" component={ContadorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
