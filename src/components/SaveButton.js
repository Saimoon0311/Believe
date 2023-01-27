import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import DropShadow from 'react-native-drop-shadow';
import {Touchable} from './Touchable';

const SaveButton = ({onPress, title}) => {
  return (
    <DropShadow
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.7,
        shadowRadius: 15,
      }}>
      <Touchable Opacity={0.8} style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Touchable>
    </DropShadow>
  );
};

export default SaveButton;

const styles = StyleSheet.create({
  button: {
    height: 75,
    width: '100%',
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.fadeBlue,
    // backgroundColor: Colors.barFaded,
  },
  text: {
    fontSize: 21,
    letterSpacing: 0.75,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.medium,
  },
});
