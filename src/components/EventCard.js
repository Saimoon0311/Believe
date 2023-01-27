import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import {assets, lock, play} from '@/Assets/Images';
import {eventDateView, timeLayout} from '@/utils/helper';
import {Touchable} from './Touchable';
import BlurImage from './BlurImage';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const EventCard = ({data}) => {
  const status = active => {
    return Boolean(active != 'Active') ? 'Join' : 'RSVP';
  };

  const renderItem = (item, index) => {
    return (
      <View key={index} style={styles.card}>
        <BlurImage
          uri={item?.image}
          styles={styles.boxData}
          blurhash={item?.hash_code}
        />
        <View style={styles.textContainer}>
          <View style={styles.rowStart}>
            <View style={styles.row}>
              <Image source={assets} />
              <Text numberOfLines={1} style={styles.topic}>
                {eventDateView(item?.date)}
              </Text>
            </View>
            <View>
              <Image source={lock} />
            </View>
          </View>
          <View>
            <Text numberOfLines={2} style={styles.heading}>
              {item?.name}
            </Text>
            <View style={styles.rowBetween}>
              <View style={styles.width}>
                <Text numberOfLines={1} style={styles.time}>
                  {item?.description}
                </Text>
                <Text numberOfLines={1} style={styles.subHeading}>
                  {timeLayout(item?.start_time)} - {timeLayout(item?.end_time)}
                </Text>
              </View>
              <View style={styles.bottom}>
                <Text numberOfLines={1} style={styles.buttonText}>
                  {status(item?.status)}
                </Text>
                <Touchable>
                  <Image source={play} />
                </Touchable>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      {data?.map(renderItem)}
    </ScrollView>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    // marginHorizontal: Sizes.width * 0.02,
    marginHorizontal: widthPercentageToDP('2'),
    // alignSelf: 'center',
  },
  boxData: {
    height: 230,
    borderRadius: 10,
    width: widthPercentageToDP('95'),
    alignSelf: 'center',
    // width: Sizes.width * 0.825,
  },
  textContainer: {
    bottom: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10,
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
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  width: {
    width: '70%',
  },
  rowStart: {
    width: '95%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
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
    fontSize: 12.5,
    paddingLeft: 5,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  bottom: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 14,
    paddingRight: 7.5,
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
});
