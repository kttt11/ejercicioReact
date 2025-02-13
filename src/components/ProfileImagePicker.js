import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileImagePicker = ({ profileImage, setProfileImage }) => {
  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
      if (!response.didCancel && !response.error && response.assets) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.avatar} />
        ) : (
          <Image source={require('../../assets/sigmaLogo.png')} style={styles.avatar} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
});

export default ProfileImagePicker;