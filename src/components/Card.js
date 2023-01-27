import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';

const Card = ({data, onPress}) => (
  <View style={styles.card}>
    <Image source={data?.image} style={styles.boxData} />
    <View style={styles.container}>
      <Text style={styles.heading}>{data?.name}</Text>
      <View style={styles.subContainer}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={[styles.button]}>
          <Text style={styles.buttonText}>{data?.button}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default Card;

const styles = StyleSheet.create({
  card: {
    width: '47.5%',
    borderRadius: 20,
  },
  container: {
    top: '30%',
    left: '5%',
    width: '90%',
    position: 'absolute',
    height: '43%',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  boxData: {
    width: '100%',
    resizeMode: 'contain',
    height: Sizes.height * 0.35,
  },
  heading: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: FontFamily.bold,
  },
  subContainer: {
    alignItems: 'flex-end',
  },
  button: {
    width: 70,
    height: 35,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.white,
    backgroundColor: Colors.gray2,
    // marginRight: 15,
  },
  buttonText: {
    fontSize: 12,
    color: Colors.white,
    textTransform: 'uppercase',
    fontFamily: FontFamily.bold,
  },
});
