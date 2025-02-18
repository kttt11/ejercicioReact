// App.js
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegistroScreen from './screens/RegistroScreen';
import AppNavigator from './navigation/AppNavigator';
import HomeScreen from './screens/HomeScreen';
import PushupScreen from './screens/PushupScreen';
import RegistroAdicionalScreen from './screens/RegistroAdicionalScreen';
import TerminosCondiciones from './screens/TerminosCondiciones';
import EditPerfilScreen from './screens/EditPerfilScreen';




const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Pushup" component={PushupScreen} />
        <Stack.Screen name="RegistroAdicional" component={RegistroAdicionalScreen} />
        <Stack.Screen name="TerminosCondiciones" component={TerminosCondiciones} />
        <Stack.Screen name="EditPerfilScreen" component={EditPerfilScreen} />
        
        {/* Aquí incluimos el TabNavigator en lugar de Home */}
        <Stack.Screen name="Body" component={AppNavigator} options={{ headerShown: false }} />
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

