import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function BottonBar() {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.icon}>
            <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
          <AntDesign name="user" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcons name="arm-flex-outline" size={24} color="black" />
          </TouchableOpacity>
        </SafeAreaView>
      )
    }
    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        height: 80,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,

      },
      icon:{
        width: 50,
        height: 50,
        backgroundColor:'#CC0000',
        borderRadius: 30 ,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        color: 'white'
      },
    })