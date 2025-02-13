// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatAssistantScreen from '../screens/ChatAssistantScreen';
import BodyScreen from '../screens/BodyScreen';
import EjerciciosScreen from '../screens/EjerciciosScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Perfil from '../screens/Perfil';
import AntDesign from '@expo/vector-icons/AntDesign'
import EntrenarScreen from '../screens/EntrenarScreen';
import PushupScreen from '../screens/PushupScreen';
import PerfilUser from '../screens/PerfilUser';
import RegistroAdicionalScreen from '../screens/RegistroAdicionalScreen';
import EditPerfilScreen from '../screens/EditPerfilScreen';


const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Perfil"
      screenOptions={{
        tabBarStyle: { backgroundColor: '#FFFFFF' }, // Barra de navegación blanca
        tabBarActiveTintColor: 'black', // Color del texto activo (negro)
        tabBarInactiveTintColor: 'rgb(80, 79, 79) ', // Color del texto inactivo (gris)
        tabBarActiveBackgroundColor: '#09726F', // Color de fondo activo (celeste)

      }}
    >


      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color="black" />
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
            <Tab.Screen
        name="Usuario"
        component={PerfilUser} // Agregamos la nueva pantalla
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={24} color="black" /> // Ícono de usuario
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
