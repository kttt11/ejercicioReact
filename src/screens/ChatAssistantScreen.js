import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, } from 'react-native';
import { speak, isSpeakingAsync, stop } from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const ChatAssistantScreen = () => {
  const [chat, setChat] = useState([]); // Mensajes de chat
  const [userInput, setUserInput] = useState(''); // Entrada del usuario
  const [isSpeaking, setIsSpeaking] = useState(false); // Estado para el manejo de voz

  const flatListRef = useRef(null); // Referencia para el FlatList
  const navigation = useNavigation(); // Navegación para el botón de "Volver"
  const [messagechatbot, setMessagechatbot] = useState("");


  const responsechatbot = async (messageQ) => {
    try {
      const response = await axios.post(`http://192.168.0.104:8000/chatbot`, {
        message: messageQ,
      });
      return response.data.response; // Retorna la respuesta del chatbot
    } catch (error) {
      console.error("Error en el Chat:", error.response?.data || error.message);
      return "Error al obtener respuesta"; // Devuelve un mensaje de error
    }
  };
  
  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;
  
    // Mensaje del usuario
    const newUserMessage = {
      id: `${chat.length}`,
      role: 'user',
      text: userInput,
    };
  
    // Actualiza el chat con el mensaje del usuario
    const updatedChat = [...chat, newUserMessage];
    setChat(updatedChat);
    setUserInput('');
  
    try {
      // Espera la respuesta del chatbot
      const botResponse = await responsechatbot(userInput);
  
      // Mensaje del chatbot
      const botReply = {
        id: `${updatedChat.length}`,
        role: 'assistant',
        text: botResponse, // Usa la respuesta obtenida
      };
  
      // Agrega la respuesta del chatbot al chat
      setChat([...updatedChat, botReply]);
    } catch (error) {
      console.error("Error en el chatbot:", error);
    }
  
    // Desplazamiento automático al final del chat
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };
  // Maneja la síntesis de voz
  const handleSpeech = async (text) => {
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else {
      if (!(await isSpeakingAsync())) {
        speak(text);
        setIsSpeaking(true);
      }
    }
  };

  // Renderizado de cada mensaje
  const renderChatItem = ({ item }) => (
    <View
      style={[
        styles.chatItem,
        item.role === 'user' ? styles.userChatItem : styles.modelChatItem,
      ]}
    >
      <Text style={styles.chatText}>{item.text}</Text>
      {item.role === 'assistant' && (
        <View style={styles.speakerButton}>
          <Button title="🔊" onPress={() => handleSpeech(item.text)} color="#fff" />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Asistente Virtual</Text>

      <FlatList
        ref={flatListRef}
        data={chat}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        style={styles.chatContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Escribe tu mensaje..."
          value={userInput}
          onChangeText={setUserInput}
        />
        <Button title="Enviar" onPress={handleSendMessage} />
      </View>

      <View style={styles.goBackButton}>
        <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 8,
  },
  goBackButton: {
    marginTop: 10,
  },
  chatItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
    position: 'relative',
  },
  userChatItem: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  modelChatItem: {
    alignSelf: 'flex-start',
    backgroundColor: '#000',
  },
  chatText: {
    fontSize: 16,
    color: '#fff',
  },
  speakerButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});

export default ChatAssistantScreen;
