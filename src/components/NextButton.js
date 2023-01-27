import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {Touchable} from './Touchable';
import ShadowButton from './ShadowButton';

const NextButton = ({onPress, buttonTitle, disabled = false}) => {
  const pressAction = () => onPress?.();

  return (
    <ShadowButton>
      <Touchable
        disabled={disabled}
        Opacity={0.8}
        style={styles.button}
        onPress={pressAction}>
        <Text style={styles.text}>{buttonTitle}</Text>
      </Touchable>
    </ShadowButton>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 40,
    paddingVertical: 20,
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
