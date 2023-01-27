import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Touchable} from './Touchable';
import {Colors, FontFamily} from '@/theme/Variables';

const TimeFilterModal = ({data, filterData, onClose}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Duration</Text>
      <View style={styles.subContainer}>
        {data.map((item, index) => {
          const onPress = () => onClose(item);
          const selected = Boolean(filterData?.id == item?.id);
          return (
            <View key={index} style={styles.button}>
              <Touchable Opacity={0.7} onPress={onPress}>
                <Text
                  style={[
                    styles.time,
                    {
                      color: selected ? Colors.greenFaded : Colors.white,
                    },
                  ]}>
                  {item?.time}
                </Text>
              </Touchable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TimeFilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // backgroundColor: Colors.darkFaded,
  },
  subContainer: {
    marginTop: 20,
  },
  heading: {
    fontSize: 22,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  button: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.blurWhite,
  },
  time: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
});
