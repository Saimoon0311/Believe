import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Colors} from '@/theme/Variables';
import {Touchable} from './Touchable';

const FilterTime = ({onOpen, icon, color}) => {
  return (
    <Touchable onPress={onOpen} Opacity={0.7} style={styles.textfield}>
      <Image
        source={icon}
        style={{
          resizeMode: 'contain',
          tintColor: color ? Colors.greenFaded : Colors.white,
        }}
      />
    </Touchable>
  );
};

export default FilterTime;

const styles = StyleSheet.create({
  textfield: {
    width: 50,
    height: 50,
    borderRadius: 10,
    // width: '100%',
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.white,
    // marginHorizontal: '5%',
    backgroundColor: Colors.blueMenu2,
    // backgroundColor: Colors.searchFaded,
  },
});
