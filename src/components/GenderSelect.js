import React, {useCallback} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {gender, radioOff, radioOn} from '@/Assets/Images';
import {Touchable} from './Touchable';

const genderData = [
  {
    name: 'Male',
  },
  {
    name: 'Female',
  },
  {
    name: 'Other',
  },
];

const GenderSelect = ({marked, setMarked}) => {
  const renderItem = useCallback(
    (item, index) => {
      const setRadio = marked == item?.name;
      return (
        <Touchable
          key={index}
          Opacity={0.7}
          onPress={() => setMarked(item?.name)}
          style={styles.button}>
          <Image
            style={[
              styles.icon,
              {
                tintColor: setRadio ? Colors.greenFaded : Colors.white,
              },
            ]}
            source={setRadio ? radioOn : radioOff}
          />
          <Text style={styles.text}>{item?.name}</Text>
        </Touchable>
      );
    },
    [marked],
  );

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Image style={styles.icon} source={gender} />
        <Text style={styles.time}>Gender</Text>
      </View>
      <View style={styles.select}>{genderData.map(renderItem)}</View>
    </View>
  );
};

export default GenderSelect;

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: '100%',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: '5%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: Colors.fadeBlue,
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  time: {
    fontSize: 18,
    paddingLeft: 15,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  icon: {
    width: 20,
    height: 20,
    // marginLeft: 10,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  text: {
    fontSize: 14,
    paddingLeft: 10,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  select: {
    marginBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
