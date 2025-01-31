
// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegistroScreen from '../screens/RegistroScreenScreen';
import EntrenarScreen from '../screens/EntrenarScreen';
import PushupScreen from '../screens/PushupScreen';
import ContadorScreen from '../screens/ContadorScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
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
};

export default AppNavigator;