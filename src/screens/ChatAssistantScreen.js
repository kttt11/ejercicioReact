import React, { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { speak, isSpeakingAsync, stop } from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatAssistantScreen = () => {
  const [chat, setChat] = useState([]); // Mensajes de chat
  const [userInput, setUserInput] = useState(''); // Entrada del usuario
  const [isSpeaking, setIsSpeaking] = useState(false); // Estado para el manejo de voz

  const flatListRef = useRef(null); // Referencia para el FlatList


  // Maneja el envío del mensaje
  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    const newUserMessage = {
      id: `${chat.length}`,
      role: 'user',
      text: userInput,
    };

    const updatedChat = [...chat, newUserMessage];

    // Simulación de respuesta automática
    const botReply = {
      id: `${updatedChat.length}`,
      role: 'assistant',
      text: 'Este es un ejemplo de respuesta automática.',
    };

    const finalChat = [...updatedChat, botReply];
    setChat(finalChat);
    setUserInput('');
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
          <TouchableOpacity onPress={() => handleSpeech(item.text)} style={styles.speakerButtonStyle}>
            <Text style={styles.speakerButtonText}>🔊</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 5 }}>
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
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
  
// Estilos para los botones personalizados
sendButton: {
   backgroundColor:'#81d8d0', // Color de fondo del botón enviar
   paddingVertical:10,
   paddingHorizontal :20,
   borderRadius :5,
},
sendButtonText:{
   color:'#FFFFFF', // Color del texto del botón enviar
   fontWeight:'bold',
},
backButtonText:{
   color:'#FFFFFF', // Color del texto del botón volver
   fontWeight:'bold',
},
speakerButtonStyle:{
   backgroundColor:'#007AFF', // Color de fondo del botón de voz
   paddingVertical :5,
   paddingHorizontal :10,
   borderRadius :5,
},
speakerButtonText:{
   color:'#FFFFFF', // Color del texto del botón de voz
},
});

export default ChatAssistantScreen;
