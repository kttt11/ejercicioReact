// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import HomeScreen from '../screens/HomeScreen';
import RegistroScreen from '../screens/RegistroScreenScreen';
import EjerciciosScreen from '../screens/EjerciciosScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Ejercicios" component={EjerciciosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;