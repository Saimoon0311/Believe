import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet, Keyboard} from 'react-native';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {Controller} from 'react-hook-form';

const UpdateField = ({
  errors,
  control,
  name,
  icon,
  isRequired,
  placeholder,
  defaultValue,
  type,
  keyboardType,
  editable,
  maxLength,
}) => {
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
          <View style={styles.textfield}>
            <View style={styles.iconBox}>
              <Image source={icon} style={styles.icon} />
            </View>
            <TextInput
              onBlur={onBlur}
              onFocus={onFocus}
              type={type}
              {...{
                value,
                editable,
                placeholder,
                keyboardType,
                style: styles.input,
                onChangeText: onChange,
                autoCapitalize: 'none',
                fontSize: FontSize.xlarge,
                selectionColor: Colors.white,
                placeholderTextColor: Colors.blurWhite,
                maxLength,
              }}
            />
          </View>
        )}
        {...{
          name,
          control,
          defaultValue,
          rules: {required: Boolean(isRequired)},
        }}
      />
      {errors[name]?.message && (
        <View>
          <Text style={styles.error}>{errors[name]?.message}</Text>
        </View>
      )}
    </>
  );
};

export default UpdateField;

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    color: Colors.description,
    fontSize: FontSize.medium,
    fontFamily: FontFamily.regular,
  },
  textfield: {
    // width: '90%',
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    backgroundColor: Colors.fadeBlue,
  },
  input: {
    flex: 1,
    height: 75,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  description: {
    marginVertical: 5,
    color: Colors.placeholder,
    fontFamily: FontFamily.regular,
  },
  error: {
    color: Colors.redFade,
    fontSize: FontSize.default,
    fontFamily: FontFamily.regular,
  },
  iconBox: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
});
