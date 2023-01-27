import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';

function Header() {
  return (
    <View>
      <Text numberOfLines={2} style={styles.heading}>
        Great! I know just what to recommend to you.
      </Text>
      <Text style={styles.subTitle}>
        When is a good time for me to send your personalized recommendations?
      </Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    textAlign: 'left',
    marginVertical: 30,
    color: Colors.fadedGray,
    width: Sizes.width * 0.7,
    fontFamily: FontFamily.regular,
  },
  subTitle: {
    fontSize: 28,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.bold,
  },
});
