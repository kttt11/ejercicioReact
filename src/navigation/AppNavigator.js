import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatAssistantScreen from '../screens/ChatAssistantScreen';
import EntrenarScreen from '../screens/EntrenarScreen';
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
        tabBarActiveTintColor: '#09726F', // Color del ícono activo (verde)
        tabBarInactiveTintColor: 'rgb(80, 79, 79)', // Color del ícono inactivo (gris)
        tabBarActiveBackgroundColor: '#FFFFFF', // Fondo blanco cuando activo
        tabBarIconStyle: { // Mantener estilo de los íconos sin bordes
          borderWidth: 0,  // Sin borde
          borderColor: 'transparent', // Sin color de borde
          borderRadius: 0, // Sin borde redondeado
        },
      }}
    >
      <Tab.Screen
        name="Cuerpo"
        component={BodyScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="body-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Entrenar"
        component={EntrenarScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="arm-flex-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chatbot"
        component={ChatAssistantScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
