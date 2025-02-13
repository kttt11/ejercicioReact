import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
      {/* Título centrado */}
      <View style={styles.header}>
        <Text style={styles.title}>Perfil de Usuario</Text>
      </View>

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
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24, // Tamaño del texto más grande
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
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
});

export default PerfilUser;