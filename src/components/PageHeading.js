import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import BackButton from './BackButton';

const PageHeading = ({
  title,
  navigation,
  backButton,
  menu,
  iconPress,
  iconChange,
  iconColor,
  nextText,
  menuStyles,
  iconStyle,
}) => {
  return (
    <View style={styles.container}>
      {backButton ? (
        <>
          <BackButton {...{navigation}} />
          <Text numberOfLines={1} style={styles.heading}>
            {title}
          </Text>
          <BackButton
            {...{
              navigation,
              backButton,
              menu,
              iconPress,
              iconChange,
              iconColor,
              nextText,
              menuStyles,
              iconStyle,
            }}
          />
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

export default PageHeading;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  heading: {
    width: '75%',
    fontSize: 22,
    textAlign: 'center',
    color: Colors.white,
    paddingVertical: 20,
    fontFamily: FontFamily.medium,
  },
  center: {
    width: '100%',
    alignItems: 'center',
  },
});
