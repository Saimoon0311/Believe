import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import {Touchable} from '../../components/Touchable';

function Header({goNext}) {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Text numberOfLines={2} style={styles.heading}>
          How do you want to feel today?
        </Text>
        {/* <Touchable onPress={goNext} Opacity={0.7}>
          <Text style={styles.text}>Done</Text>
        </Touchable> */}
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: '5%',
  },
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
