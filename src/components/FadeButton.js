import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import DropShadow from 'react-native-drop-shadow';
import {Touchable} from './Touchable';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const FadeButton = ({onPress, title}) => {
  return (
    <DropShadow
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
      }}>
      <Touchable Opacity={0.7} style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Touchable>
    </DropShadow>
  );
};

export default FadeButton;

const styles = StyleSheet.create({
  button: {
    height: heightPercentageToDP('7'),
    width: '100%',
    borderRadius: 18,
    marginVertical: heightPercentageToDP('2'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.fadeBlue,
  },
  text: {
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
  },
});
