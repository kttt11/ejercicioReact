// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './screens/SignIn'; 
import HomeScreen from './screens/HomeScreen'; 
import RegistroScreen from './screens/RegistroScreen';
import EjerciciosScreen from './screens/EjerciciosScreen';
// Only import react-native-gesture-handler on native platforms
=======
import { StyleSheet } from 'react-native';
>>>>>>> e5ae06cd78b25ec01655042de54d7f584bcbecad
import 'react-native-gesture-handler';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegistroScreen from './screens/RegistroScreen';
import ChatAssistantScreen from './screens/ChatAssistantScreen';
import BodyScreen from './screens/BodyScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
<<<<<<< HEAD
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Ejercicios" component={EjerciciosScreen} />
=======
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={RegistroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BodyScreen" component={BodyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChatAssistantScreen" component={ChatAssistantScreen} options={{ headerShown: false }} />
>>>>>>> e5ae06cd78b25ec01655042de54d7f584bcbecad
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

