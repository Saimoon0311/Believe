import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {mark} from '@/Assets/Images';

const MarkItem = ({children}) => (
  <View style={styles.container}>
    <Image source={mark} style={styles.image} />
    <Text
      fontSize={12}
      style={styles.text}
      fontFamily="heading"
      color={Colors.white}
      alignSelf="flex-start">
      {children}
    </Text>
  </View>
);

export default MarkItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    flexDirection: 'row',
  },
  image: {
    width: 15,
    height: 15,
    marginTop: 2.5,
    marginRight: 10,
    tintColor: Colors.white,
  },
  text: {
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
});
