import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet, Keyboard} from 'react-native';
import {Controller} from 'react-hook-form';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {eye, eye_off} from '../Assets/Images';
import {Touchable} from './Touchable';

const InputPlaylist = ({
  minLength,
  placeholder,
  isRequired,
  control,
  name,
  message,
  errors,
  type,
  label,
  defaultValue,
  isDisabled = false,
}) => {
  const keyboardType = ['phone', 'reset_code'].includes(name)
    ? 'numeric'
    : 'default';
  const [focus, setFocus] = useState(false);
  function onFocus() {
    setFocus(true);
  }
  function onBlur() {
    setFocus(false);
  }

  useEffect(() => {
    const keyboardHide = Keyboard.addListener('keyboardDidHide', () => {
      setFocus(false);
      Keyboard.dismiss();
    });
    return () => {
      keyboardHide.remove();
    };
  }, []);

  return (
    <>
      <Controller
        render={({field: {onChange, value}}) => (
          <View>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.textfield}>
              <TextInput
                onBlur={onBlur}
                onFocus={onFocus}
                type={type}
                {...{
                  value,
                  defaultValue,
                  isDisabled,
                  placeholder,
                  keyboardType,
                  style: styles.input,
                  onChangeText: onChange,
                  autoCapitalize: 'none',
                  fontSize: FontSize.large,
                  selectionColor: Colors.white,
                  placeholderTextColor: Colors.blurWhite,
                }}
              />
            </View>
          </View>
        )}
        {...{
          name,
          control,
          defaultValue,
          rules: {required: Boolean(isRequired), minLength},
        }}
      />
      {errors[name]?.message && (
        <View
          style={{
            // width: Platform.OS == 'ios' ? width * 0.875 : Sizes.width * 0.9,
            width: Sizes.width * 0.9,
          }}>
          <Text
            style={[
              styles.error,
              {
                fontSize: FontSize.default,
              },
            ]}>
            {errors[name]?.message}
          </Text>
        </View>
      )}
    </>
  );
};

export default InputPlaylist;

const styles = StyleSheet.create({
  label: {
    color: Colors.label,
    fontSize: FontSize.default,
    fontFamily: FontFamily.regular,
  },
  textfield: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: Colors.white,
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundBlue,
  },
  input: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    textAlign: 'left',
    color: Colors.white,
    paddingHorizontal: 10,
    fontFamily: FontFamily.regular,
  },
  description: {
    marginVertical: 5,
    color: Colors.placeholder,
    fontFamily: FontFamily.regular,
  },
  error: {
    color: Colors.redFade,
    fontFamily: FontFamily.regular,
  },
});
