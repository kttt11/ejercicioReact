import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { speak, isSpeakingAsync, stop } from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const ChatAssistantScreen = () => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const flatListRef = useRef(null);
  const navigation = useNavigation();

  // Función para obtener respuesta del chatbot
  const responsechatbot = async (messageQ) => {
    try {
      const response = await axios.post("http://192.168.0.104:8000/chatbot", {
        message: messageQ,
      });

      // Limpia el texto eliminando los asteriscos
      const cleanResponse = response.data.response.replace(/\*{2}/g, '');
      return cleanResponse; // Retorna la respuesta sin asteriscos
    } catch (error) {
      console.error("Error en el Chat:", error.response?.data || error.message);
      return "Error al obtener respuesta"; // Devuelve un mensaje de error
    }
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    const newUserMessage = {
      id: `${chat.length}`,
      role: 'user',
      text: userInput,
    };

    const updatedChat = [...chat, newUserMessage];
    setChat(updatedChat);
    setUserInput('');

    try {
      const botResponse = await responsechatbot(userInput);
      const botReply = {
        id: `${updatedChat.length}`,
        role: 'assistant',
        text: botResponse,
      };
      setChat([...updatedChat, botReply]);
    } catch (error) {
      console.error("Error en el chatbot:", error);
    }

    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

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
      <Text style={styles.header}>
        <Text style={styles.holaStyle}>¡Hola! </Text>
        SigmaGym Bot aquí. ¿En qué te ayudo hoy?
      </Text>

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

        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  holaStyle: {
    fontSize: 28, // Tamaño más grande
    fontWeight: 'bold',
    color: '#09726F', 
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Sombra ligera
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
  sendButton: {
    backgroundColor: '#09726F', // Verde
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
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
    backgroundColor: '#09726F',
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
  button: {
    color: '#09726F',
  },
});

export default ChatAssistantScreen;

