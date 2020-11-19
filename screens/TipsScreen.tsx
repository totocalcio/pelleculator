import React from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import { Title } from 'react-native-paper';
import { useFonts, MPLUS1p_500Medium } from '@expo-google-fonts/m-plus-1p';

import defaultStyles from '../styles';

const TipsScreen = () => {
  let [fontsLoaded] = useFonts({
    MPLUS1p_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={[defaultStyles.container, { paddingHorizontal: 30 }]}>
        <View style={styles.titleView}>
          <Title style={styles.title}>■ 成長期について</Title>
        </View>
        <Text style={[styles.text, { marginBottom: 30 }]}>
          成長期（主に4~6ヶ月くらい）はペレットも食べ放題で良いとの意見もありますが、本アプリはあくまで計算アプリなので掲載しておりません。「ペレット食べ放題論」が間違っているというわけではないと思いますので、うさちゃんの様子を見ながら与えてあげて下さい。
        </Text>
        <View style={styles.titleView}>
          <Title style={styles.title}>■ 維持期について</Title>
        </View>
        <Text style={styles.text}>
          本アプリでは
          <Text style={styles.span}>（1.5%は○○g）</Text>
          と表示しております。維持期のペレットの量は体重の1~3%と言われておりますが、1.5%前後が良いとされていることが多いため、わかりやすく1.5%の量も表示するようにしております。
        </Text>
      </View>
    );
  }
};

export default TipsScreen;

const styles = StyleSheet.create({
  titleView: {
    borderBottomColor: '#442c2e',
    borderBottomWidth: 2,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  title: {
    fontFamily: 'MPLUS1p_500Medium',
    fontSize: 20,
    fontWeight: '300',
  },
  text: {
    fontFamily: 'MPLUS1p_500Medium',
    fontSize: 17,
    fontWeight: '300',
  },
  span: {
    color: '#d9376e',
  },
});
