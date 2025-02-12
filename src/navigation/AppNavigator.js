// TabNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegistroScreen from '../screens/RegistroScreenScreen';
import EntrenarScreen from '../screens/EntrenarScreen';
import PushupScreen from '../screens/PushupScreen';
import ContadorScreen from '../screens/ContadorScreen';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatAssistantScreen from '../screens/ChatAssistantScreen';
import EjerciciosScreen from '../screens/EjerciciosScreen';
import BodyScreen from '../screens/BodyScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Entrenar" component={EntrenarScreen} />
        <Stack.Screen name="Pushup" component={PushupScreen} />
        <Stack.Screen name="Contador" component={ContadorScreen} />
        
        {/* Agregar el Tab.Navigator dentro del Stack.Navigator */}
        <Stack.Screen
          name="Main"
          component={() => (
            <Tab.Navigator
              initialRouteName="Cuerpo"
              screenOptions={{
                tabBarStyle: { backgroundColor: '#FFFFFF' },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'rgb(80, 79, 79)',
                tabBarActiveBackgroundColor: '#09726F',
              }}
            >
              <Tab.Screen
                name="Cuerpo"
                component={BodyScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="body-outline" size={24} color="black" />
                  ),
                }}
              />
              <Tab.Screen
                name="Ejercicios"
                component={EjerciciosScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="arm-flex-outline" size={24} color="black" />
                  ),
                }}
              />
              <Tab.Screen
                name="Chat"
                component={ChatAssistantScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
                  ),
                }}
              />
            </Tab.Navigator>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
