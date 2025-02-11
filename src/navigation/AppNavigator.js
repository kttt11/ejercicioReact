// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator, NavigationContainer } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import HomeScreen from '../screens/HomeScreen';
import RegistroScreen from '../screens/RegistroScreen';
import EjerciciosScreen from '../screens/EjerciciosScreen';
// import LoginScreen from '../screens/LoginScreen';
import ChatAssistantScreen from '../screens/ChatAssistantScreen';
import BodyScreen from '../screens/BodyScreen';
import PerfilUser from '../screens/PerfilUser ';
import InfoPersonalScreen from '../screens/InfoPersonalScreen';
import EditUserScreen from '../screens/EditUserScreen';
import TerminosCondiciones from '../screens/TerminosCondiciones';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PerfilUser">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={RegistroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Ejercicios" component={EjerciciosScreen} />
        <Stack.Screen name="BodyScreen" component={BodyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChatAssistantScreen" component={ChatAssistantScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PerfilUser" component={PerfilUser } options={{ headerShown: false }} />
        <Stack.Screen name="InfoPersonalScreen" component={InfoPersonalScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditUserScreen" component={EditUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TerminosCondiciones" component={TerminosCondiciones} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;