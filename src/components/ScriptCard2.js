import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import BlurImage from './BlurImage';
import * as images from '@/Assets/Images';
import SubscribeCheck from './SubscribeCheck';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {minuteCall, viewsFormatter} from '@/utils/helper';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const ScriptCard2 = ({item, title, newData, onPress}) => {
  const tracks = Boolean(title == 'series');
  const eBooks = Boolean(title == 'eBooks');
  const half = minuteCall(item?.duration);
  return (
    <SubscribeCheck
      style={styles.boxData(eBooks)}
      onPress={onPress}
      item={item}>
      <BlurImage
        uri={item?.image}
        styles={styles.boxData(eBooks)}
        radius={eBooks ? 0.1 : 10}
        blurhash={item?.hash_code}
      />
      <View style={styles.textContainer(eBooks, tracks)}>
        <Text
          numberOfLines={2}
          style={[styles.heading, {paddingBottom: tracks ? 0 : 7}]}>
          {item?.name}
        </Text>

        {
          <View style={styles.rowCenter}>
            <Image source={images[item?.type]} style={styles.icon} />
            <Text numberOfLines={1} style={styles.type}>
              {item?.type.charAt(0).toUpperCase() + item?.type.slice(1)}
              {/* {item?.type} */}
            </Text>
          </View>
        }

        <View style={styles.rowCenter}>
          {/* { ( */}
          <Text numberOfLines={1} style={styles.subHeading}>
            {half} MIN{'  '}
          </Text>
          {/* ) : ( */}
          <Text numberOfLines={1} style={styles.subHeading}>
            {viewsFormatter(item?.views) + ' '}Views
          </Text>
          {/* )} */}
          <View style={styles.textBox}>
            {
              <FontAwesome
                size={heightPercentageToDP('0.5')}
                name="circle"
                color={Colors.lightGray}
                style={{marginTop: heightPercentageToDP('0.5')}}
              />
            }
            <Text numberOfLines={1} style={styles.time}>
              {newData == true ? item?.category?.name : ''}
            </Text>
          </View>
        </View>

        {/* <View style={styles.rowCenter}>
          <Image source={images[title]} style={styles.icon} />
          <Text
            numberOfLines={1}
            style={[
              styles.type,
              {textTransform: eBooks ? 'none' : 'capitalize'},
            ]}>
            {title}
          </Text>
        </View> */}
      </View>
    </SubscribeCheck>
  );
};

export default React.memo(ScriptCard2);

const styles = StyleSheet.create({
  boxData: eBooks => ({
    height: 280,
    borderRadius: 10,
    width: Sizes.width * 0.4325,
    borderRadius: eBooks ? 0 : 10,
  }),
  textContainer: (eBooks, tracks) => ({
    bottom: 0,
    zIndex: 1,
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: Colors.overlayColor,
    height: tracks ? 100 : 85,
    borderBottomLeftRadius: eBooks ? 0 : 10,
    borderBottomRightRadius: eBooks ? 0 : 10,
  }),
  heading: {
    fontSize: 16,
    textAlign: 'left',
    color: Colors.white,
    textTransform: 'capitalize',
    fontFamily: FontFamily.medium,
  },
  tracks: {
    fontSize: 12,
    textAlign: 'left',
    color: Colors.lightGray2,
    fontFamily: FontFamily.regular,
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    // paddingVertical: 2.5,
  },
  icon: {
    width: 17.5,
    height: 17.5,
    resizeMode: 'contain',
  },
  type: {
    fontSize: 12,
    paddingLeft: 5,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.light,
  },
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  subHeading: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'left',
    color: Colors.grayScale,
    fontFamily: FontFamily.regular,
  },
  halftime: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'left',
    color: Colors.lightGray2,
    fontFamily: FontFamily.regular,
  },
  textBox: {
    width: '80%',
    marginLeft: 5,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  time: {
    fontSize: 10,
    marginLeft: 5,
    textAlign: 'left',
    color: Colors.grayScale,
    textTransform: 'uppercase',
    fontFamily: FontFamily.regular,
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 17.5,
    height: 17.5,
    resizeMode: 'contain',
  },
});
