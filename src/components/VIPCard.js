import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Touchable} from './Touchable';
import {Colors, FontFamily} from '@/theme/Variables';
import {vip} from '@/Assets/Images';

const VIPCard = ({title, subTitle}) => {
  return (
    <Touchable Opacity={0.7} style={styles.container}>
      <Image source={vip} style={styles.image} />
      <View style={styles.textView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </Touchable>
  );
};

export default VIPCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: '5%',
    marginHorizontal: '5%',
  },
  textView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    width: '75%',
    position: 'absolute',
    justifyContent: 'center',
    paddingHorizontal: '7.5%',
  },
  title: {
    fontSize: 30,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  subTitle: {
    fontSize: 14,
    marginTop: 15,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  image: {
    height: 140,
    width: '100%',
    borderRadius: 10,
  },
});
