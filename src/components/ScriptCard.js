import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import BlurImage from './BlurImage';
import * as images from '@/Assets/Images';
import SubscribeCheck from './SubscribeCheck';

const ScriptCard = ({item, title, onPress}) => {
  const tracks = Boolean(title == 'series');
  const eBooks = Boolean(title == 'eBooks');
  // const TouchableComponent = TouchableOpacity;
  const TouchableComponent = tracks ? TouchableOpacity : SubscribeCheck;
  return (
    <TouchableComponent
      style={styles.boxData(eBooks)}
      item={item}
      onPress={tracks ? () => onPress(item) : onPress}>
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
        {tracks && (
          <Text
            numberOfLines={2}
            style={[styles.tracks, {paddingVertical: tracks ? 5 : 0}]}>
            {item?.tracks_length || 0} Tracks
          </Text>
        )}
        <View style={styles.rowCenter}>
          <Image source={images[title]} style={styles.icon} />
          <Text
            numberOfLines={1}
            style={[
              styles.type,
              {textTransform: eBooks ? 'none' : 'capitalize'},
            ]}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableComponent>
  );
};

export default React.memo(ScriptCard);

const styles = StyleSheet.create({
  boxData: eBooks => ({
    height: 260,
    borderRadius: 10,
    width: Sizes.width * 0.4325,
    borderRadius: eBooks ? 0 : 10,
    marginBottom: '4%',
    marginRight: Sizes.width * 0.0325,
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
    fontSize: 18,
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
});
