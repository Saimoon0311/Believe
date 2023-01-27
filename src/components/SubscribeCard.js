import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import {Touchable} from './Touchable';
import {radioOff, radioOn} from '@/Assets/Images';
import {generateSubViewObject} from '@/utils/helper';

const SubscribeCard = ({item, marked, onPress, title, trial}) => {
  const {packageTitle, price, discountPrice} = generateSubViewObject(item);
  const getFirstWork = title.split(' ');
  const dplicate = [...getFirstWork];
  dplicate.shift();
  return (
    <Touchable onPress={() => onPress(item)} Opacity={0.7} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.subHeading}>
          {packageTitle !== 'Monthly' ? (
            <Text>
              <Text style={{fontWeight: 'bold'}}>{getFirstWork[0]}</Text>{' '}
              <Text>
                {dplicate} {price}
              </Text>
            </Text>
          ) : (
            <Text style={{fontWeight: 'bold'}}>
              {packageTitle} {'\n'}
            </Text>
          )}
        </Text>
        <Image
          source={marked?.productId == item?.productId ? radioOn : radioOff}
        />
      </View>

      <Text
        style={[
          styles.heading,
          {color: Colors.green, textTransform: 'capitalize'},
        ]}>
        {trial || title}
      </Text>

      {packageTitle == 'Monthly' ? (
        <Text style={[styles.heading, {marginTop: '25%'}]}>
          {price + '/month'}
        </Text>
      ) : (
        <Text style={[styles.heading, {marginTop: '25%'}]}>
          {discountPrice}
        </Text>
      )}
    </Touchable>
  );
};

export default SubscribeCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 10,
    width: '45%',
    height: 170,
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderColor: Colors.borderBlue,
    backgroundColor: Colors.barFaded,
    marginRight: Sizes.width * 0.075,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeading: {
    fontSize: 14,
    marginTop: 5,
    color: Colors.white,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
  },
  heading: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  vertical: {
    marginVertical: 10,
  },
  description: {
    fontSize: 12,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.light,
  },
  trial: {
    fontSize: 12,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  discount: {
    fontSize: 14,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
});
