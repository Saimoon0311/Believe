import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {Touchable} from './Touchable';
import ShadowButton from './ShadowButton';

const ButtonPress = ({onPress, buttonTitle}) => {
  return (
    <ShadowButton>
      <Touchable Opacity={0.8} onPress={onPress} style={styles.button}>
        <Text style={styles.title}>{buttonTitle}</Text>
      </Touchable>
    </ShadowButton>
  );
};

export default ButtonPress;

const styles = StyleSheet.create({
  button: {
    height: 70,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    // marginVertical: 20,
    justifyContent: 'center',
    backgroundColor: Colors.blueButton,
  },
  title: {
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
  },
});
