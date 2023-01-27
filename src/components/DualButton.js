import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {Touchable} from './Touchable';

const DualButton = ({onPress, title2, onSubmit, handleSubmit, dual}) => {
  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: dual ? '0%' : '5%',
          marginHorizontal: dual ? '0%' : '5%',
        },
      ]}>
      <Touchable
        Opacity={0.7}
        style={[styles.button, {backgroundColor: Colors.backgroundBlue}]}
        onPress={onPress}>
        <Text style={styles.text}>Cancel</Text>
      </Touchable>
      <Touchable
        Opacity={0.7}
        style={styles.button}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.text}>{title2}</Text>
      </Touchable>
    </View>
  );
};

export default DualButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: 50,
    width: '47.5%',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.greenCard5,
    backgroundColor: Colors.greenFaded,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
});
