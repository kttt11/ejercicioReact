// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatAssistantScreen from '../screens/ChatAssistantScreen';
import BodyScreen from '../screens/BodyScreen';
import EjerciciosScreen from '../screens/EjerciciosScreen';
import HomeScreen from '../screens/HomeScreen'; // Asegúrate de importar HomeScreen
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import Perfil from '../screens/Perfil';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Perfil"
      screenOptions={{
        tabBarStyle: { backgroundColor: '#FFFFFF' }, // Barra de navegación blanca
        tabBarActiveTintColor: 'black', // Color del texto activo (negro)
        tabBarInactiveTintColor: 'rgb(80, 79, 79) ', // Color del texto inactivo (gris)
        tabBarActiveBackgroundColor: '#81d8d0', // Color de fondo activo (celeste)

      }}
    >
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color="black" />
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
      <Tab.Screen
        name="Body"
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
    </Tab.Navigator>
  );
}

export default AppNavigator;
