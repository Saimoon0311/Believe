import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {durationCall} from '@/utils/helper';
import BlurImage from './BlurImage';
import {videos} from '@/Assets/Images';
import SubscribeCheck from './SubscribeCheck';

const VideoCard = ({item, index, data, onPress}) => {
  return (
    <SubscribeCheck item={item} onPress={onPress} style={styles.boxData}>
      <BlurImage
        uri={item?.image}
        styles={styles.boxData}
        blurhash={item?.hash_code}
      />
      <View style={styles.textContainer}>
        <View style={styles.ninety}>
          <Text numberOfLines={1} style={styles.heading}>
            {item?.name}
          </Text>
          <View style={styles.rowCenter}>
            <Image source={videos} style={styles.icon} />
            <Text numberOfLines={1} style={styles.type}>
              Videos
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.subHeading}>
            {durationCall(item?.duration)}
          </Text>
        </View>
      </View>
    </SubscribeCheck>
  );
};

export default React.memo(VideoCard);

const styles = StyleSheet.create({
  boxData: {
    height: 200,
    width: '100%',
    borderRadius: 10,
  },
  textContainer: {
    bottom: 0,
    zIndex: 1,
    width: '100%',
    height: '40%',
    position: 'absolute',
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'space-between',
    backgroundColor: Colors.overlayColor,
  },
  ninety: {
    width: '90%',
  },
  heading: {
    fontSize: 18,
    width: '90%',
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  subHeading: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'left',
    color: Colors.grayScale,
    fontFamily: FontFamily.regular,
  },
  icons: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: Colors.blue,
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
