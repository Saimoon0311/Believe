import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {Touchable} from '@/components/Touchable';
import {favorite, start} from '@/Assets/Images';
import {minuteCall} from '@/utils/helper';
import BlurImage from './BlurImage';
import SubscribeCheck from './SubscribeCheck';

const FavoriteData = ({item, onPress, onRemove, favoriteTrue=true}) => (
  <SubscribeCheck onPress={onPress} item={item} style={styles.listView}>
    <View style={styles.container}>
      <BlurImage
        uri={item?.image}
        styles={styles.album}
        blurhash={item?.hash_code}
      />
      <View style={styles.artistList}>
        <Text numberOfLines={2} style={styles.name}>
          {item?.name}
        </Text>
        <Text style={styles.artist}>{minuteCall(item?.duration)}m</Text>
      </View>
      <View style={styles.center}>
        <Touchable onPress={() => onRemove(item)} style={styles.right}>
          {favoriteTrue && <Image source={favorite} />}
        </Touchable>
        <Image style={styles.start} source={start} />
      </View>
    </View>
  </SubscribeCheck>
);

export default React.memo(FavoriteData);

const styles = StyleSheet.create({
  listView: {
    borderRadius: 10,
    width: '100%',
    height: Sizes.height * 0.1,
    backgroundColor: Colors.primaryFaded,
  },
  album: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  artistList: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  name: {
    width: '85%',
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.medium,
  },
  artist: {
    textAlign: 'right',
    color: Colors.white,
    fontSize: FontSize.default,
    fontFamily: FontFamily.regular,
  },
  center: {
    marginRight: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  right: {
    zIndex: 999,
    marginHorizontal: 5,
  },
  start: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.greenFaded,
  },
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
});
