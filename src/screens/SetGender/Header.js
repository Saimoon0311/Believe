import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';

function Header() {
  return (
    <View>
      <Text numberOfLines={2} style={styles.heading}>
        What is your gender?
      </Text>
      <Text style={styles.subTitle}>
        This helps us find the best content for you. It is private and will not
        be shared.
      </Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    textAlign: 'left',
    color: Colors.white,
    maxWidth: Sizes.width * 0.7,
    fontFamily: FontFamily.bold,
  },
  subTitle: {
    fontSize: 20,
    textAlign: 'left',
    marginVertical: 30,
    color: Colors.fadedGray,
    fontFamily: FontFamily.regular,
  },
});
