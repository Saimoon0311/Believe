import React, {useEffect} from 'react';
import {View, TextInput, StyleSheet, Keyboard} from 'react-native';
import {Colors, FontFamily, FontSize} from '@/theme/Variables';

const InputTitle = ({placeholder, value, type, onChangeText}) => {
  useEffect(() => {
    const keyboardHide = Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss();
    });
    return () => {
      keyboardHide.remove();
    };
  }, []);

  return (
    <TextInput
      type={type}
      {...{
        value,
        placeholder,
        style: [styles.input, styles.textfield],
        keyboardType: 'default',
        fontSize: FontSize.large,
        onChangeText,
        selectionColor: Colors.greenFaded,
        placeholderTextColor: Colors.blurWhite,
      }}
    />
  );
};

export default InputTitle;

const styles = StyleSheet.create({
  textfield: {
    height: 60,
    width: '80%',
    borderRadius: 10,
    marginVertical: 30,
    backgroundColor: Colors.blueMenu2,
    alignSelf: 'center',
    position: 'relative',
    zIndex: 9555,
  },
  input: {
    height: 60,
    fontSize: 16,
    borderRadius: 10,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.medium,
    paddingHorizontal: 10,
  },
});
