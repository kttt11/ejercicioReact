import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const TerminosCondiciones = () => {
  const navigation = useNavigation(); // Hook para manejar la navegación

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.title}>Términos y Condiciones de Uso de SigmaGym</Text>
        <Text style={styles.sectionTitle}>1. Introducción</Text>
        <Text style={styles.text}>
          Bienvenido a SigmaGym, una aplicación móvil desarrollada como parte de un proyecto académico
          en la Universidad Central del Ecuador. Al utilizar nuestra aplicación, usted acepta cumplir
          con los siguientes términos y condiciones. Si no está de acuerdo con alguna de las
          disposiciones, le recomendamos que no utilice la aplicación.
        </Text>

        <Text style={styles.sectionTitle}>2. Registro y Acceso</Text>
        <Text style={styles.text}>
          Para acceder a los servicios de SigmaGym, el usuario debe registrarse proporcionando información
          personal como nombre, edad, correo electrónico, estatura, peso y género. Estos datos se utilizan
          para personalizar la experiencia dentro de la aplicación.
        </Text>

        <Text style={styles.sectionTitle}>3. Servicios de la Aplicación</Text>
        <Text style={styles.text}>
          SigmaGym ofrece las siguientes funcionalidades:
          {'\n'}• Registro y autenticación de usuarios.
          {'\n'}• Análisis de tipo de cuerpo mediante la captura de fotografías.
          {'\n'}• Chat con una inteligencia artificial para consejos de salud y bienestar físico.
          {'\n'}• (Próximamente) Verificación de ejercicios como push-ups y press militar mediante el uso de la cámara.
        </Text>

        <Text style={styles.sectionTitle}>4. Uso de Datos Personales</Text>
        <Text style={styles.text}>
          SigmaGym recopila y procesa los datos personales con el fin de ofrecer un servicio personalizado.
          Los datos almacenados incluyen nombre, edad, correo electrónico, estatura, peso y género.
          Estos datos son utilizados únicamente para mejorar la experiencia del usuario dentro de la aplicación.
        </Text>

        <Text style={styles.sectionTitle}>5. Compartición de Datos</Text>
        <Text style={styles.text}>
          Algunos datos personales (nombre, peso, estatura, edad y género) pueden ser compartidos con las API
          de Gemini para mejorar la experiencia de interacción con la inteligencia artificial. No compartimos su
          información con terceros fuera de este ámbito sin su consentimiento.
        </Text>

        <Text style={styles.sectionTitle}>6. Derechos del Usuario</Text>
        <Text style={styles.text}>
          El usuario tiene pleno acceso a sus datos y puede editarlos o eliminarlos en cualquier momento.
          Sin embargo, eliminar ciertos datos podría afectar la funcionalidad y personalización de la aplicación.
        </Text>

        <Text style={styles.sectionTitle}>7. Seguridad de los Datos</Text>
        <Text style={styles.text}>
          SigmaGym implementa las reglas de seguridad de Firebase para proteger la información almacenada
          en Cloud Firestore, Realtime Database y Cloud Storage. Además, se revisan las bibliotecas de terceros
          para evitar la inclusión de código malicioso.
        </Text>

        <Text style={styles.sectionTitle}>8. Modificaciones a los Términos y Condiciones</Text>
        <Text style={styles.text}>
          SigmaGym podrá actualizar estos términos y condiciones en cualquier momento. En caso de modificaciones,
          se notificará a los usuarios mediante un aviso al inicio de la aplicación.
        </Text>

        <Text style={styles.sectionTitle}>9. Contacto</Text>
        <Text style={styles.text}>
          Para cualquier duda o consulta relacionada con estos términos y condiciones, puede ponerse en contacto
          con nosotros a través de los medios proporcionados dentro de la aplicación.
        </Text>

        {/* Botón de aceptar */}
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
            Aceptar y Continuar
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#09726F",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#09726F",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#09726F",
    width: "80%",
  },
});

export default TerminosCondiciones;