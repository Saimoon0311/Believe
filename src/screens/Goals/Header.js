import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';

const Header = ({goBack, title, description}) => (
  <View style={{padding: 20}}>
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.heading}>
        {title}
      </Text>
      <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
        <Text style={styles.text}>Done</Text>
      </TouchableOpacity>
    </View>
    <Text numberOfLines={1} style={styles.subTitle}>
      {description}
    </Text>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 24,
    textAlign: 'left',
    color: Colors.white,
    maxWidth: Sizes.width * 0.7,
    fontFamily: FontFamily.bold,
  },
  text: {
    fontSize: 18,
    textAlign: 'right',
    color: Colors.greenFaded,
    fontFamily: FontFamily.medium,
  },
  subTitle: {
    fontSize: 18,
    marginTop: 5,
    textAlign: 'left',
    color: Colors.gray,
    fontFamily: FontFamily.regular,
  },
});
