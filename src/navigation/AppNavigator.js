import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegistroScreen from '../screens/RegistroScreen';
import ChatAssistantScreen from '../screens/ChatAssistantScreen';
import BodyScreen from '../screens/BodyScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Registro" component={RegistroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BodyScreen" component={BodyScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChatAssistantScreen" component={ChatAssistantScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;