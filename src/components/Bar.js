import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import {Touchable} from './Touchable';
import {bar, play} from '@/Assets/Images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Bar = ({item, title, viewMeditation}) => {
  const onPressHandler = () => viewMeditation({title});
  return (
    <View style={styles.card}>
      <Image source={bar} style={styles.boxData} />
      <View style={styles.textCard}>
        <View style={styles.textView}>
          <Text numberOfLines={1} style={styles.heading}>
            {item?.name}
          </Text>
          <View style={styles.rowEnd}>
            <Text numberOfLines={1} style={styles.subHeading}>
              {item?.title}
            </Text>
            <View style={styles.textBox}>
              <FontAwesome name="circle" size={5} color={Colors.fadedGray} />
              <Text numberOfLines={1} style={styles.time}>
                {item?.time}
              </Text>
            </View>
          </View>
        </View>
        <Touchable onPress={onPressHandler} Opacity={0.7}>
          <Image source={play} style={styles.icon} />
        </Touchable>
      </View>
    </View>
  );
};

export default Bar;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  card: {
    marginLeft: Sizes.width * 0.035,
    marginTop: 20,
  },
  boxData: {
    resizeMode: 'contain',
    justifyContent: 'center',
    width: Sizes.width * 0.925,
    height: Sizes.height * 0.125,
  },
  textCard: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 25,
    position: 'absolute',
    top: '27.5%',
    width: Sizes.width * 0.925,
    justifyContent: 'space-between',
  },
  textView: {
    width: '80%',
  },
  heading: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  time: {
    fontSize: 12,
    marginLeft: 5,
    textAlign: 'left',
    color: Colors.fadedGray,
    textTransform: 'uppercase',
    fontFamily: FontFamily.regular,
  },
  subHeading: {
    fontSize: 12,
    marginTop: 10,
    textAlign: 'left',
    color: Colors.fadedGray,
    fontFamily: FontFamily.regular,
  },
  icon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
});
