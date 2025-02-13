import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { getUserData, saveOrUpdateUserData } from '../services/user';
import Loading from '../components/Loading';

const EditPerfilScreen = ({ navigation }) => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    gender: '',
    birthDate: '',
    weight: '',
    height: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        Alert.alert('Error', 'Usuario no autenticado.');
        setLoading(false);
        return;
      }

      try {
        const data = await getUserData(uid);
        if (data) {
          setUserData({
            ...data,
            weight: data.weight?.toString() || '', // Convertir a cadena
            height: data.height?.toString() || '', // Convertir a cadena
          });
        } else {
          console.warn('No se encontraron datos para este usuario.');
        }
      } catch (error) {
        console.error('Error obteniendo los datos del usuario:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      Alert.alert('Error', 'Usuario no autenticado.');
      return;
    }

    try {
      await saveOrUpdateUserData(uid, {
        ...userData,
        weight: parseFloat(userData.weight) || 0, // Convertir a número
        height: parseFloat(userData.height) || 0, // Convertir a número
      });
      Alert.alert('Éxito', 'Perfil actualizado correctamente.');
    } catch (error) {
      console.error('Error actualizando los datos del usuario:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil.');
    }
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <TextInput
        label="Nombre"
        value={userData.name}
        onChangeText={(text) => setUserData({ ...userData, name: text })}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Apellido"
        value={userData.lastName}
        onChangeText={(text) => setUserData({ ...userData, lastName: text })}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Género"
        value={userData.gender}
        onChangeText={(text) => setUserData({ ...userData, gender: text })}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Fecha de Nacimiento"
        value={userData.birthDate}
        onChangeText={(text) => setUserData({ ...userData, birthDate: text })}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Peso (kg)"
        value={userData.weight}
        onChangeText={(text) => setUserData({ ...userData, weight: text })}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Altura (cm)"
        value={userData.height}
        onChangeText={(text) => setUserData({ ...userData, height: text })}
        mode="outlined"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleUpdate} style={styles.button}>
        Guardar Cambios
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { marginBottom: 16 },
  button: { marginTop: 20, backgroundColor: '#09726F' },
});

export default EditPerfilScreen;