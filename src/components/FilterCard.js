import React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';

const FilterCard = ({item, marked, onPress}) => {
  const isActive = Boolean(marked?.id == item?.id);
  const pressEvent = () => onPress(item);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={pressEvent}
      style={styles.card}>
      <Image style={styles.boxData(isActive)} source={item?.image} />
      <Text numberOfLines={1} style={styles.heading(isActive)}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(FilterCard);

const styles = StyleSheet.create({
  card: {
    width: 90,
    height: 90,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Sizes.width * 0.04,
    backgroundColor: Colors.fadeBlue,
    marginRight: Sizes.width * 0.0125,
  },
  boxData: active => ({
    width: 35,
    height: 35,
    resizeMode: 'contain',
    tintColor: active ? Colors.greenFaded : Colors.white,
  }),
  heading: active => ({
    fontSize: 12,
    marginTop: 12.5,
    textAlign: 'center',
    fontFamily: FontFamily.medium,
    color: active ? Colors.greenFaded : Colors.white,
  }),
});
