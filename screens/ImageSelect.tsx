import React, { useContext } from 'react';
import {
  Alert,
  AsyncStorage,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Linking } from 'expo';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import { ImageContext } from '../contexts/AppContext';

export default function ImageSelect() {
  const { image, setImage } = useContext(ImageContext);
  const PHOTO = '@photo';

  const AsyncAlert = async () => {
    if (Platform.OS === 'ios') {
      // iOS用
      new Promise((resolve) => {
        Alert.alert(
          `カメラロールの許可が無効になっています`,
          '設定画面へ移動しますか？',
          [
            {
              text: 'キャンセル',
              style: 'cancel',
            },
            {
              text: '設定する',
              onPress: () => {
                Linking.openURL('app-settings:');
              },
              style: 'destructive',
            },
          ],
          { cancelable: false },
        );
      });
    } else {
      // Android用
      new Promise((resolve) => {
        Alert.alert(
          '申し訳ありません。機能を使うにはカメラロールの権限が必要です。',
        );
      });
    }
  };
  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      const alertResult = await AsyncAlert();
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
      try {
        const Photo = JSON.stringify(pickerResult.uri);
        await AsyncStorage.setItem(PHOTO, Photo);
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <View style={styles.imageContent}>
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
