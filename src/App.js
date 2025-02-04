// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import SignIn from './screens/SignIn'; 
import RegistroScreen from './screens/RegistroScreen';
import AppNavigator from './navigation/AppNavigator';
import 'react-native-gesture-handler';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        
        {/* Aquí incluimos el TabNavigator en lugar de Home */}
        <Stack.Screen name="Home" component={AppNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
