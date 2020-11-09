import React, { useState, useEffect, useContext } from 'react';
import { AppLoading } from 'expo';
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useFonts, MPLUS1p_500Medium } from '@expo-google-fonts/m-plus-1p';

import ImageSelect from './ImageSelect';
import defaultStyles from '../styles';
import { ImageContext } from '../contexts/AppContext';

// enum typeSex {
//   'male',
//   'female',
//   'unknown',
// }

const ProfileScreen = () => {
  let [fontsLoaded] = useFonts({
    MPLUS1p_500Medium,
  });

  const [image, setImage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [sex, setSex] = useState<string>('male');
  const [weight, setWeight] = useState<string>('');
  const [birth, setBirth] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const [welcome, setWelcome] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const [variety, setVariety] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [select, setSelect] = useState<string>('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false,
  );

  const showFc = (str: string) => {
    setSelect(str);
    showDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    hideDatePicker();
    if (select === 'birth') {
      setBirth(date.toISOString().split('T')[0]);
    } else {
      setWelcome(date.toISOString().split('T')[0]);
    }
  };

  let user = {
    image,
    name,
    sex,
    weight,
    birth,
    welcome,
    variety,
    color,
  };

  const save = async () => {
    try {
      await AsyncStorage.setItem('MyRabbit', JSON.stringify(user));
    } catch (err) {
      alert(err);
    }
  };

  const remove = async () => {
    try {
      await AsyncStorage.removeItem('MyRabbit');
    } catch (err) {
      alert(err);
    } finally {
      setImage('');
      setName('');
      setSex('male');
      setWeight('');
      setBirth(new Date().toISOString().split('T')[0]);
      setWelcome(new Date().toISOString().split('T')[0]);
      setVariety('');
      setColor('');
      setSelect('');
    }
  };

  const load = async () => {
    try {
      let jsonString = await AsyncStorage.getItem('MyRabbit');

      if (jsonString !== null) {
        const jsonValue = JSON.parse(jsonString);
        user = { ...jsonValue };
        setImage(user.image);
        setName(user.name);
        setSex(user.sex);
        setWeight(user.weight);
        setBirth(user.birth);
        setWelcome(user.welcome);
        setVariety(user.variety);
        setColor(user.color);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView style={{ backgroundColor: '#fedbd0' }}>
        <View
          style={[
            defaultStyles.container,
            {
              justifyContent: 'flex-start',
              paddingVertical: 40,
            },
          ]}
        >
          <ImageContext.Provider value={{ image, setImage }}>
            <ImageSelect />
          </ImageContext.Provider>
          <Text style={styles.title}>名前</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Text style={styles.title}>性別</Text>
          <RadioButton.Group
            onValueChange={(value) => setSex(value)}
            value={sex}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.sex}>
                <RadioButton.Item
                  color="#d9376e"
                  value="male"
                  status={sex === 'male' ? 'checked' : 'unchecked'}
                  onPress={() => setSex('male')}
                  label=""
                  style={styles.sexBtn}
                />
                <Text style={styles.sexText}>男の子</Text>
              </View>
              <View style={styles.sex}>
                <RadioButton.Item
                  color="#d9376e"
                  value="female"
                  status={sex === 'female' ? 'checked' : 'unchecked'}
                  onPress={() => setSex('female')}
                  label=""
                  style={styles.sexBtn}
                />
                <Text style={styles.sexText}>女の子</Text>
              </View>
              <View style={styles.sex}>
                <RadioButton.Item
                  color="#d9376e"
                  value="unknown"
                  status={sex === 'unknown' ? 'checked' : 'unchecked'}
                  onPress={() => setSex('unknown')}
                  label=""
                  style={styles.sexBtn}
                />
                <Text style={styles.sexText}>不明</Text>
              </View>
            </View>
          </RadioButton.Group>
          <Text style={styles.title}>体重</Text>
          <View style={styles.weight}>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={(text) => setWeight(text)}
            />
            <Text style={styles.name}>kg</Text>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            textColor="#fedbd0"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            locale="ja-JP"
            style={{ backgroundColor: '#442c2e' }}
          />
          <Text style={styles.title}>誕生日</Text>
          <View style={styles.date}>
            <Text style={[styles.name, styles.dateText]}>{birth}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => showFc('birth')}
            >
              <Text style={styles.buttonText}>選択</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>お迎えした日</Text>
          <View style={styles.date}>
            <Text style={[styles.name, , styles.dateText]}>{welcome}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => showFc('welcome')}
            >
              <Text style={styles.buttonText}>選択</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>種類</Text>
          <TextInput
            style={styles.input}
            value={variety}
            onChangeText={(text) => setVariety(text)}
          />
          <Text style={styles.title}>色</Text>
          <TextInput
            style={styles.input}
            value={color}
            onChangeText={(text) => setColor(text)}
          />
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <TouchableOpacity style={styles.button} onPress={() => save()}>
              <Text style={styles.buttonText}>保存</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => remove()}>
              <Text style={styles.buttonText}>リセット</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
};

export default ProfileScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'MPLUS1p_500Medium',
    fontSize: 18,
    fontWeight: '300',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  name: {
    fontFamily: 'MPLUS1p_500Medium',
    fontSize: 18,
    fontWeight: '300',
  },
  sex: {
    position: 'relative',
    justifyContent: 'center',
  },
  sexBtn: {
    flexDirection: 'row-reverse',
    width: 120,
  },
  sexText: {
    fontFamily: 'MPLUS1p_500Medium',
    fontSize: 18,
    fontWeight: '300',
    position: 'absolute',
    paddingLeft: 60,
    zIndex: -1,
  },
  weight: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    marginHorizontal: 32,
    marginVertical: 16,
    height: 36,
    borderRadius: 6,
    fontFamily: 'MPLUS1p_500Medium',
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 30,
    alignSelf: 'flex-start',
  },
  dateText: {
    backgroundColor: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 32,
    borderRadius: 6,
  },
  button: {
    fontFamily: 'MPLUS1p_500Medium',
    backgroundColor: '#442c2e',
    paddingVertical: 8,
    paddingHorizontal: 32,
    marginHorizontal: 32,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'MPLUS1p_500Medium',
  },
});
