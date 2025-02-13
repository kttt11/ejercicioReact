import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Appbar } from 'react-native-paper';

const PerfilUser = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sí", onPress: () => navigation.replace('SignIn') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Barra de navegación */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Perfil de Usuario" style={styles.appbarTitle} />
      </Appbar.Header>

      {/* Sección de imagen de perfil */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3415/3415756.png' }} // Imagen de ejemplo
          style={styles.profileImage}
        />
      </View>

      {/* Contenedor de opciones y botón */}
      <View style={styles.optionsContainer}>
        {/* Opciones de perfil */}
        <View style={styles.options}>
          {/* Botón Editar Perfil */}
          <TouchableOpacity 
            style={styles.option} 
            onPress={() => navigation.navigate('EditPerfilScreen')}
          >
            <Icon name="person-outline" size={30} color="#000" />
            <Text style={styles.optionText}>Editar perfil</Text>
          </TouchableOpacity>

          {/* Botón Términos y Condiciones */}
          <TouchableOpacity 
            style={styles.option} 
            onPress={() => navigation.navigate('TerminosCondiciones')}
          >
            <Icon name="help-circle-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Términos y Condiciones</Text>
          </TouchableOpacity>

          {/* Botón Cerrar Sesión */}
          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <Icon name="log-out-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

        {/* Botón de regresar */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
            <Text style={styles.goBackText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  appbar: {
    backgroundColor: 'white',
    elevation: 1,
  },
  appbarTitle: {
    textAlign: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 65,
    backgroundColor: '#ccc',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  options: {
    marginTop: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#000',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 90,
  },
  goBackButton: {
    padding: 15,
    backgroundColor: '#09726F',
    borderRadius: 25,
    width: '65%',
    alignItems: 'center',
  },
  goBackText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default PerfilUser;