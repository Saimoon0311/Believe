import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {Touchable} from './Touchable';
// import {BlurView} from 'expo-blur';

const ActionButton = ({onPress, buttonTitle, blackBox}) => {
  return (
    <Touchable Opacity={0.8} onPress={onPress} style={styles.button}>
      <Text style={styles.title}>{buttonTitle}</Text>
    </Touchable>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: Sizes.width * 0.9,
    borderColor: Colors.white,
    backgroundColor: Colors.blurWhite,
  },
  title: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: FontSize.large,
    fontFamily: FontFamily.medium,
  },
});
