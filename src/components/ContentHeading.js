import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import BackButton from './BackButton';

const ContentHeading = ({title, navigation, backButton, menu}) => {
  return (
    <View style={styles.container}>
      {backButton ? (
        <>
          <BackButton {...{navigation}} />
          <Text numberOfLines={1} style={styles.heading}>
            {title}
          </Text>
          <BackButton {...{navigation, backButton, menu}} />
        </>
      ) : (
        <View style={styles.center}>
          <Text numberOfLines={1} style={styles.heading}>
            {title}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ContentHeading;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  center: {
    width: '100%',
    alignItems: 'center',
  },
  heading: {
    width: '80%',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.white,
    paddingVertical: 20,
    fontFamily: FontFamily.medium,
  },
});
