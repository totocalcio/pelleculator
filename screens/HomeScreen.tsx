import * as React from 'react';
import { View,StyleSheet } from 'react-native';
import { RadioButton, Text ,Headline,Title} from 'react-native-paper';
import { AppLoading } from 'expo';
import { useFonts, MPLUS1p_500Medium } from '@expo-google-fonts/m-plus-1p';
import Slider from '@react-native-community/slider';

import defaultStyles from '../styles';


const HomeScreen = () => {

  const ageAry = ['幼年期','成長期','維持期','高齢期'];

  const [age, setAge] = React.useState(ageAry[2]);
  const [sum, setSum] = React.useState('0');
  const [weight, setWeight] = React.useState(2);

  React.useEffect(()=>{
    switch (ageAry.indexOf(age)) {
      case 0:
        setSum(`${50 * weight}`);
        break;
      case 1:
        setSum(` ${30 * weight} ~ ${50 * weight}` );
        break;
      case 2:
        setSum(`${10 * weight} ~ ${30 * weight}` );
        break;
      case 3:
        setSum(`${20 * weight}`);
        break;
    }
  });

  let [fontsLoaded] = useFonts({
    MPLUS1p_500Medium
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={ [defaultStyles.container,{position:"relative"}]}>
        {/* {
          (ageAry.indexOf(age)===1) && (
            <Text style={styles.popText01}>４ヶ月～６ヶ月は食べ放題(太りすぎ注意)</Text>
          )
        } */}
        {/* {
          !function() {
            console.log('test2');
            if (ageAry.indexOf(age)===2) {
              return(
                <Text style={styles.popText01}>{`(1.5%は${15 * weight}g)`}</Text>
              );
            }
          }
        } */}
        
        <View style={styles.sum}>
          {
            (ageAry.indexOf(age)===2) && (
              <Text style={styles.popText01}>{`(1.5%は${15 * weight}g)`}</Text>
            )
          }
          <Title style={[styles.title,{textAlign:'center'}]}>{`ペレット: ${sum} g / 1日`}</Title>
        </View>
        <Headline style={styles.headLine}>{`${age}`}</Headline>
        <View style={styles.inner}>
          <RadioButton.Group
            onValueChange={value => setAge(value)}
            value={age}
          >
            <View style={[styles.radio,{marginBottom:5}]}>
              <RadioButton.Item style={{flexDirection:"row-reverse"}} value={ageAry[0]} color="#d9376e" label=""/>
              <Text style={styles.radioText}>【幼年期】４ヶ月まで</Text>
            </View>
            <View style={[styles.radio,{marginBottom:5}]}>
              <RadioButton.Item style={{flexDirection:"row-reverse"}} value={ageAry[1]} color="#d9376e" label=""/>
              <Text style={styles.radioText}>【成長期】４ヶ月から１歳</Text>
            </View>
            <View style={[styles.radio,{marginBottom:5}]}>
              <RadioButton.Item style={{flexDirection:"row-reverse"}} value={ageAry[2]} color="#d9376e" label=""/>
              <Text style={styles.radioText}>【維持期】１歳以降</Text>
            </View>
            <View style={styles.radio}>
              <RadioButton.Item style={{flexDirection:"row-reverse"}} value={ageAry[3]} color="#d9376e" label=""/>
              <Text style={styles.radioText}>【高齢期】６歳以降</Text>
            </View>
          </RadioButton.Group>
        </View>
        <Headline style={styles.headLine}>{`体重 : ${weight} kg`}</Headline>
        <Slider
          step={0.5}
          style={{width: "100%", height: 20}}
          minimumValue={1}
          maximumValue={4}
          minimumTrackTintColor="#ffffff"
          maximumTrackTintColor="#442c2e"
          onValueChange={weight=>setWeight(weight)}
          thumbTintColor="#d9376e"
          value={weight}
        />
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  inner: {
    paddingHorizontal:10,
    width:"100%"
  },
  radio: {
    position:"relative",
    justifyContent:"center",
    backgroundColor:"#ffffff",
    width:"100%",
    height:50,
  },
  radioText: {
    fontFamily:'MPLUS1p_500Medium',
    fontSize:16,
    position:"absolute",
    paddingLeft:60,
    zIndex:-1,
},
  headLine: {
    paddingVertical : 6,
    fontFamily:'MPLUS1p_500Medium',
    fontSize:20,
    marginVertical:20,
  },
  sum: {
    position:'relative',
    width:'100%'
  },
  title: {
    paddingVertical : 6,
    fontFamily:'MPLUS1p_500Medium',
    fontSize:24,
  },
  popText01: {
    fontFamily:'MPLUS1p_500Medium',
    fontSize:20,
    color:'#d9376e',
    position:"absolute",
    bottom:40,
    alignSelf:'center'
  },
});