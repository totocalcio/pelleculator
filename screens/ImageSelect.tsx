import React, { useState, useEffect, useContext } from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Platform,
  AsyncStorage,
  StyleSheet,
  Text,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import { ImageContext } from '../contexts/AppContext';

export default function ImagePickerExample() {
  const { image, setImage } = useContext(ImageContext);

  const PHOTO = '@photo';

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert(
            '申し訳ありません。機能を使うにはカメラロールの権限が必要です。',
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    try {
      const Photo = JSON.stringify(result.uri);
      await AsyncStorage.setItem(PHOTO, Photo);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View style={styles.imageContent}>
      {/* {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 160, height: 160, borderRadius: 160 }}
        />
      )} */}
      {image ? (
        <Image
          source={{ uri: image }}
          style={{ width: 160, height: 160, borderRadius: 160 }}
        />
      ) : (
        <Image
          source={require('../docs/img/splash.png')}
          style={{
            width: 160,
            height: 160,
            borderRadius: 160,
            backgroundColor: '#fff',
          }}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>写真を選ぶ</Text>
      </TouchableOpacity>

      {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    fontFamily: 'MPLUS1p_500Medium',
    backgroundColor: '#442c2e',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 6,
    marginVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'MPLUS1p_500Medium',
  },
});
