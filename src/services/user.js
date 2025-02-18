import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const db = getFirestore();

/**
 * Guardar o actualizar datos del usuario en Firestore
 * @param {string} uid - El ID único del usuario
 * @param {Object} userData - Los datos del usuario a guardar o actualizar
 */
export const saveOrUpdateUserData = async (uid, userData) => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, userData, { merge: true }); // merge:true asegura que solo los campos proporcionados sean actualizados
    console.log('Datos del usuario guardados/actualizados correctamente.');
  } catch (error) {
    console.error('Error guardando/actualizando los datos del usuario:', error);
    throw error; // Re-lanza el error para que sea manejado por el componente que llama esta función
  }
};

/**
 * Obtener datos del usuario desde Firestore
 * @param {string} uid - El ID único del usuario
 * @returns {Object|null} - Los datos del usuario o null si no existen
 */
export const getUserData = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      console.log('Datos obtenidos del usuario:', data);
      return data;
    } else {
      console.warn(`No se encontró el documento para UID: ${uid}`);
      return null;
    }
  } catch (error) {
    console.error('Error obteniendo los datos del usuario:', error);
    throw error; // Re-lanza el error para que sea manejado por el componente que llama esta función
  }
};