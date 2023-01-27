import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {Colors, FontFamily, FontSize} from '@/theme/Variables';

const BadgeCard = ({icon, title, description}) => (
  <View style={styles.box}>
    <Image source={icon} style={styles.iconTitle} />
    <View style={styles.list}>
      <Text style={styles.heading}>{title}</Text>
    </View>
  </View>
);

export default BadgeCard;

const styles = StyleSheet.create({
  box: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
  },
  iconTitle: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: Colors.greenFaded,
  },
  list: {
    paddingLeft: 25,
  },
  heading: {
    fontSize: 22,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
    fontWeight: '400',
  },
  description: {
    marginTop: 2.5,
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.light,
  },
});
