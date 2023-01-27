import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import {minuteCall} from '@/utils/helper';
import BlurImage from './BlurImage';
import * as images from '@/Assets/Images';
import SubscribeCheck from './SubscribeCheck';

const AudioCard = ({item, onPress}) => (
  <SubscribeCheck item={item} style={styles.boxData} onPress={onPress}>
    <BlurImage
      uri={item?.image}
      styles={styles.boxData}
      blurhash={item?.hash_code}>
      <View style={styles.textContainer}>
        <Text numberOfLines={2} style={styles.heading}>
          {item?.name}
        </Text>
        <View style={styles.rowCenter}>
          <Image source={images[item?.type]} style={styles.icon} />
          <Text numberOfLines={1} style={styles.type}>
            {item?.type}
          </Text>
        </View>
        <Text numberOfLines={1} style={styles.duration}>
          {item?.views} Views {minuteCall(item?.duration)}m
        </Text>
      </View>
    </BlurImage>
  </SubscribeCheck>
);

export default React.memo(AudioCard);

const styles = StyleSheet.create({
  boxData: {
    height: 260,
    borderRadius: 10,
    width: Sizes.width * 0.4325,
  },
  textContainer: {
    bottom: 0,
    zIndex: 1,
    height: 100,
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.overlayColor,
  },
  heading: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
    paddingBottom: 7,
  },
  duration: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'left',
    color: Colors.white,
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
    textTransform: 'capitalize',
    fontFamily: FontFamily.medium,
  },
});
