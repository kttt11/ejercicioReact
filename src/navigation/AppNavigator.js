<<<<<<< HEAD
// navigation/AppNavigator.js
=======
>>>>>>> e5ae06cd78b25ec01655042de54d7f584bcbecad
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
<<<<<<< HEAD
import SignIn from '../screens/SignIn';
import HomeScreen from '../screens/HomeScreen';
import RegistroScreen from '../screens/RegistroScreenScreen';
import EjerciciosScreen from '../screens/EjerciciosScreen';
=======

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegistroScreen from '../screens/RegistroScreen';
import ChatAssistantScreen from '../screens/ChatAssistantScreen';
import BodyScreen from '../screens/BodyScreen';

>>>>>>> e5ae06cd78b25ec01655042de54d7f584bcbecad
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
<<<<<<< HEAD
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Ejercicios" component={EjerciciosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
=======
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Registro" component={RegistroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BodyScreen" component={BodyScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChatAssistantScreen" component={ChatAssistantScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
>>>>>>> e5ae06cd78b25ec01655042de54d7f584bcbecad
  );
};

export default AppNavigator;