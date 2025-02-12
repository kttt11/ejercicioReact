// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatAssistantScreen from '../screens/ChatAssistantScreen';
import EjerciciosScreen from '../screens/EjerciciosScreen';
import BodyScreen from '../screens/BodyScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Cuerpo"
      screenOptions={{
        tabBarStyle: { backgroundColor: '#FFFFFF' }, // Barra de navegación blanca
        tabBarActiveTintColor: 'black', // Color del texto activo (negro)
        tabBarInactiveTintColor: 'rgb(80, 79, 79) ', // Color del texto inactivo (gris)
        tabBarActiveBackgroundColor: '#09726F', // Color de fondo activo (celeste)

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
  );
}

export default AppNavigator;
