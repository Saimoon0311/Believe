import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {Touchable} from './Touchable';
import {share} from '@/Assets/Images';
import ShadowButton from './ShadowButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const ShareButton = ({title, onPress, hide, style, textStyle}) => {
  return (
    <ShadowButton>
      <Touchable
        Opacity={0.7}
        onPress={onPress}
        style={[
          styles.button,
          {justifyContent: hide ? 'center' : 'space-between', ...style},
        ]}>
        {!hide && <Image source={share} style={styles.image} />}
        <Text style={[styles.text, {...textStyle}]}>{title}</Text>
      </Touchable>
    </ShadowButton>
  );
};

export default ShareButton;

const styles = StyleSheet.create({
  button: {
    height: 70,
    width: '100%',
    borderRadius: 10,
    // marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '22.5%',
    justifyContent: 'space-between',
    backgroundColor: Colors.blueButton,
  },
  image: {
    width: 20,
    height: 20,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  text: {
    fontSize: heightPercentageToDP('2.5'),
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
  },
});
