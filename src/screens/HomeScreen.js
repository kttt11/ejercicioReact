import * as React from 'react';
import { View, Image } from 'react-native';
import { Button, Text, Appbar } from 'react-native-paper';

const logoHome = require('../../assets/LogoHomeV2.png');

const HomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#FFFFFF', justifyContent: 'space-between' }}>
      {/* Barra de App (opcional) */}
      <View>
        <Appbar style={{ backgroundColor: 'transparent', elevation: 1 }}>
          <Appbar.Content title="" />
        </Appbar>
      </View>

      {/* Contenedor del Texto */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 1 }}>
        <Text
          style={{
            fontSize: 42,
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'uppercase',
            fontVariant: ['small-caps'],
            lineHeight: 40,
            marginBottom: 25,
            color: '#09726F',
            letterSpacing: 2,
            
          }}
        >
          ¡Bienvenido!
        </Text>
      </View>
      {/* Contenedor de la Imagen */}
      <View style={{ flex: 2, alignItems: 'center' }}>
        <Image
          source={logoHome}
          style={{ width: 600, height: 400, marginBottom: 1 }}
          resizeMode="contain"
        />
      </View>
      {/* Contenedor del Texto */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 1 }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '500',
            textAlign: 'center',
            textTransform: 'none',
            lineHeight: 20,
            marginBottom: 70,
            fontStyle: 'italic'


          }}
        >
          Entrena con confianza, cuida tu cuerpo, y alcanza tu mejor versión.
        </Text>
      </View>

      {/* Contenedor del Botón */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('LoginScreen')}
          style={{ backgroundColor: '#09726F', paddingVertical: 6, width: '60%', marginBottom: 70 }}
          labelStyle={{ fontSize: 14, fontWeight: 'thin', fontFamily: 'sans-serif-medium' }}
        >
          ¡Empezar Ahora!
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;
