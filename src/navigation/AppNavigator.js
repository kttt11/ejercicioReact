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
        tabBarStyle: { backgroundColor: '#FFFFFF' }, 
        tabBarActiveTintColor: '#09726F', 
        tabBarInactiveTintColor: 'rgb(80, 79, 79)', 
        tabBarActiveBackgroundColor: '#FFFFFF', 
        tabBarIconStyle: { 
          borderWidth: 0,  
          borderColor: 'transparent', 
          borderRadius: 0, 
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
