// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './screens/SignIn'; 
import RegistroScreen from './screens/RegistroScreen';
import AppNavigator from './navigation/AppNavigator';
import Perfil from './screens/Perfil';
import 'react-native-gesture-handler';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        
        {/* Aquí incluimos el TabNavigator en lugar de Home */}
        <Stack.Screen name="Perfil" component={AppNavigator} options={{ headerShown: false }} />
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
