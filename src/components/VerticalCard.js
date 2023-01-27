import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {assets, play} from '@/Assets/Images';
import {eventDateView, timeLayout} from '@/utils/helper';
import {Touchable} from './Touchable';
import BlurImage from './BlurImage';

const VerticalCard = ({item, index, card}) => {
  const status = active => {
    if (Boolean(active != '1')) {
      return 'Join';
    } else {
      return 'RSVP';
    }
  };

  return (
    <Touchable Opacity={1} key={index} style={styles.card}>
      <BlurImage
        radius={20}
        uri={item?.image}
        styles={styles.boxData}
        blurhash={item?.hash_code}
      />
      <View style={styles.textContainer}>
        <View style={styles.rowStart}>
          <Image source={assets} />
          <Text numberOfLines={1} style={styles.topic}>
            {eventDateView(item?.date)}
          </Text>
        </View>
        <View>
          <Text numberOfLines={2} style={styles.heading}>
            {item?.name}
          </Text>
          <View style={styles.row}>
            <View style={styles.seventy}>
              <Text numberOfLines={1} style={styles.time}>
                {item?.description}
              </Text>
              <Text numberOfLines={1} style={styles.subHeading}>
                {timeLayout(item?.start_time)} - {timeLayout(item?.end_time)}
              </Text>
            </View>
            <View style={styles.bottom}>
              <Text numberOfLines={1} style={styles.buttonText}>
                {status(card?.value)}
              </Text>
              <Touchable>
                <Image source={play} />
              </Touchable>
            </View>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

export default VerticalCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 20,
    marginHorizontal: '5%',
  },
  boxData: {
    height: 230,
    width: '100%',
    borderRadius: 20,
  },
  textContainer: {
    bottom: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 20,
    paddingBottom: 7.5,
    position: 'absolute',
    paddingHorizontal: 15,
    justifyContent: 'space-around',
    backgroundColor: Colors.grayBackground,
  },
  heading: {
    width: '90%',
    fontSize: 32,
    textAlign: 'left',
    color: Colors.yellow,
    fontFamily: FontFamily.medium,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seventy: {
    width: '70%',
  },
  rowStart: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  subHeading: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  bottom: {
    // paddingRight: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBox: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  time: {
    fontSize: 16,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  topic: {
    fontSize: 16,
    paddingLeft: 5,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  buttonText: {
    fontSize: 14,
    paddingRight: 7.5,
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
});
