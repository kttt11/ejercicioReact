// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

// import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegistroScreen from './screens/RegistroScreen';
import ChatAssistantScreen from './screens/ChatAssistantScreen';
import BodyScreen from './screens/BodyScreen';
import PerfilUser from './screens/PerfilUser';
import InfoPersonalScreen from './screens/InfoPersonalScreen';
import EditUserScreen from './screens/EditUserScreen';
import TerminosCondiciones from './screens/TerminosCondiciones';
import SignIn from './screens/SignIn';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="EditUserScreen">
      <Stack.Screen name="PerfilUser" component={PerfilUser} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={RegistroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BodyScreen" component={BodyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChatAssistantScreen" component={ChatAssistantScreen} options={{ headerShown: false }} />
        <Stack.Screen name="InfoPersonalScreen" component={InfoPersonalScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditUserScreen" component={EditUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TerminosCondiciones" component={TerminosCondiciones} options={{headerShown: false}} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
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

