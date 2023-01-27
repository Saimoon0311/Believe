import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import {Touchable} from './Touchable';

const Heading = ({
  title,
  view,
  viewAll,
  remind,
  viewReminders,
  disable,
  requestParam,
}) => {
  const pressHandler = () => {
    if (remind) viewReminders(false);
    else viewAll({title, requestParam});
  };
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.heading}>
        {title}
      </Text>
      {view && (
        <Touchable
          disabled={Boolean(disable)}
          Opacity={0.7}
          onPress={pressHandler}>
          <Text style={styles.text}>View All</Text>
        </Touchable>
      )}
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 24,
    textAlign: 'left',
    color: Colors.white,
    maxWidth: Sizes.width * 0.8,
    fontFamily: FontFamily.bold,
  },
  text: {
    fontSize: 18,
    textAlign: 'right',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
});
