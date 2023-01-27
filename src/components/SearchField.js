import React, {useEffect, useState} from 'react';
import {View, Keyboard, TextInput, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {Search} from '../Assets/Images';
import {Touchable} from './Touchable';

const SearchField = ({placeholder, onChange, value, isDisabled = false}) => {
  const [focus, setFocus] = useState(false);
  function onFocus() {
    setFocus(!focus);
  }
  useEffect(() => {
    const keyboardHide = Keyboard.addListener('keyboardDidHide', () => {
      setFocus(!focus);
      Keyboard.dismiss();
    });
    return () => {
      keyboardHide.remove();
    };
  }, []);

  return (
    <View style={styles.textfield}>
      <Image source={Search} style={styles.icon} />
      <TextInput
        onBlur={onFocus}
        onFocus={onFocus}
        {...{
          value,
          isDisabled,
          placeholder,
          keyboardType: 'default',
          style: styles.input,
          onChangeText: onChange,
          fontSize: FontSize.large,
          autoCapitalize: 'none',
          placeholderTextColor: Colors.white,
        }}
      />
    </View>
  );
};

export default SearchField;

const styles = StyleSheet.create({
  label: {
    color: Colors.description,
    fontSize: FontSize.medium,
    fontFamily: FontFamily.regular,
  },
  textfield: {
    // width: '100%',
    // marginHorizontal: '5%',
    // borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: Colors.white,
    justifyContent: 'space-between',
    backgroundColor: Colors.blueMenu2,
    // backgroundColor: Colors.searchFaded,
  },
  icon: {
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  input: {
    textAlign: 'left',
    width: '100%',
    color: Colors.white,
    height: 50,
    fontFamily: FontFamily.medium,
    // backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  //   eyeContainer: {position: 'absolute', left: '2%', top: '38%'},
  description: {
    fontFamily: FontFamily.regular,
    marginVertical: 5,
    color: Colors.placeholder,
  },
  error: {
    color: '#FF4F40',
    fontFamily: FontFamily.regular,
  },
});
