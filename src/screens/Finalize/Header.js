import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';

function Header({username}) {
  return (
    <View>
      <Text numberOfLines={2} style={styles.heading}>
        Excellent, {username}!
      </Text>
      <Text style={styles.subTitle}>Here's what you created so far:</Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.bold,
  },
  subTitle: {
    fontSize: 20,
    textAlign: 'left',
    marginVertical: 5,
    color: Colors.fadedGray,
    width: Sizes.width * 0.7,
    fontFamily: FontFamily.regular,
  },
});
