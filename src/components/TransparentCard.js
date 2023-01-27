import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {Touchable} from './Touchable';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const TransparentCard = ({item, index, marked, onPress}) => {
  const onSelect = () => onPress(item);
  return (
    <Touchable
      key={index}
      Opacity={0.7}
      onPress={onSelect}
      style={[
        styles.button,
        {
          backgroundColor:
            marked?.name == item?.name ? Colors.greenFaded : Colors.fadeBlue,
        },
      ]}>
      <Text style={styles.text}>{item?.name}</Text>
      <Text
        style={[
          styles.duration,
          {
            marginLeft: item?.time ? 20 : 0,
          },
        ]}>
        {item?.time}
      </Text>
    </Touchable>
  );
};

export default TransparentCard;

const styles = StyleSheet.create({
  button: {
    height: heightPercentageToDP('8'),
    width: '100%',
    borderRadius: 10,
    marginVertical: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '15%',
    justifyContent: 'center',
    backgroundColor: Colors.fadeBlue,
    // backgroundColor: 'red',
    // justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 24,
    textAlign: 'right',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  duration: {
    fontSize: heightPercentageToDP('3'),
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.light,
  },
});
