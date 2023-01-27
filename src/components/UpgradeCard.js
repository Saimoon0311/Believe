import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import {Touchable} from './Touchable';
import {arrowRight, timer, upgrade} from '@/Assets/Images';

const UpgradeCard = ({data, onPress}) => {
  return (
    <View style={styles.container}>
      <Image source={upgrade} style={styles.boxData} />
      <View style={styles.textCard}>
        <View style={styles.textView}>
          <Text style={styles.heading}>{data[0]?.name}</Text>
          <Text style={styles.subHeading}>{data[0]?.title}</Text>
          <Touchable onPress={onPress} Opacity={0.5} style={styles.button}>
            <Text style={styles.buttonText}>{data[0]?.button}</Text>
          </Touchable>
        </View>
      </View>
    </View>
  );
};

export default UpgradeCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: 'center',
  },
  card: {
    height: 200,
    width: '100%',
    // marginHorizontal: '5%',
  },
  boxData: {
    height: 200,
    borderRadius: 10,
    width: '95%',
  },
  textCard: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textView: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 42,
    textAlign: 'center',
    color: Colors.yellow,
    fontFamily: FontFamily.bold,
  },
  subHeading: {
    fontSize: 22,
    marginTop: 5,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.bold,
  },
  icon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  button: {
    // height: 35,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: Sizes.width * 0.3,
    borderColor: Colors.white,
    backgroundColor: 'rgba(60, 75, 119, 0.25)',
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.white,
    textTransform: 'uppercase',
    fontFamily: FontFamily.medium,
  },
});
