import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Appbar } from 'react-native-paper';

const PerfilUser = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Barra de navegación */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Perfil" style={styles.appbarTitle} />
      </Appbar.Header>

      {/* Sección de imagen de perfil */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png' }} // Imagen de ejemplo
          style={styles.profileImage}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Elegir imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Opciones de perfil */}
      <View style={styles.options}>
        <TouchableOpacity style={styles.option}>
          <Icon name="person-outline" size={24} color="#000" />
          <Text style={styles.optionText}>Editar perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="barbell-outline" size={24} color="#000" />
          <Text style={styles.optionText}>Avances</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="help-circle-outline" size={24} color="#000" />
          <Text style={styles.optionText}>Términos y Condiciones</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="log-out-outline" size={24} color="#000" />
          <Text style={styles.optionText}>Cerrar sesión</Text>
        </TouchableOpacity>
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
    borderRadius: 60,
    backgroundColor: '#ccc',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  options: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
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
