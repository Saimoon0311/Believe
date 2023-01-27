import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as Images from '@/Assets/Images';
import FastImage from 'react-native-fast-image';
import {Colors, FontSize, FontFamily} from '@/theme/Variables';

const Button = ({icon, title, onPress, disabled = false}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    {...{onPress, disabled}}
    style={styles.buttonContainer}>
    <FastImage source={Images[icon]} style={styles.icon} resizeMode="contain" />
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);
const NormalButton = ({title, onPress, disabled = false}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    {...{onPress, disabled}}
    style={styles.normalButtonContainer}>
    <Text style={styles.normalButtontitle}>{title}</Text>
  </TouchableOpacity>
);

Button.Normal = NormalButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: 52,
    backgroundColor: Colors.fadeBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  icon: {width: 30, height: 27, tintColor: 'red', marginRight: 15},
  title: {
    color: Colors.white,
    fontSize: FontSize.large,
    textAlign: 'center',
    fontFamily: FontFamily.light,
    fontWeight: '400',
  },
  normalButtontitle: {
    color: Colors.white,
    fontSize: FontSize.scale20,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
    fontWeight: '400',
  },
  normalButtonContainer: {
    width: '100%',
    height: 64,
    backgroundColor: 'rgba(12,81,133,1)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default Button;
