import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {Touchable} from '@/components/Touchable';
import {start} from '@/Assets/Images';

const DownloadCard = ({item, onPress, playAudio}) => {
  return (
    <Touchable
      onPress={() => playAudio(item)}
      activeOpacity={1}
      Opacity={1}
      style={styles.listView}>
      <View style={styles.rowStart}>
        <Image source={{uri: item?.cover_image}} style={styles.album} />
        <View style={styles.artistList}>
          <View>
            <Text numberOfLines={1} style={styles.name}>
              {item?.name}
            </Text>
          </View>
          <View style={styles.bottom}>
            <Text numberOfLines={1} style={styles.name}>
              {item?.artist}
            </Text>
          </View>
        </View>
      </View>
      <Touchable style={styles.right} onPress={() => onPress(item)}>
        <Image style={styles.start} source={start} />
      </Touchable>
    </Touchable>
  );
};

export default React.memo(DownloadCard);

const styles = StyleSheet.create({
  listView: {
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: Sizes.height * 0.1,
    // width: Sizes.width * 0.95,
    justifyContent: 'space-between',
    backgroundColor: Colors.darkBlue3,
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  album: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  artistList: {
    width: '70%',
    marginTop: 7.5,
    marginLeft: 10,
  },
  name: {
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.medium,
  },
  bottom: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  artist: {
    color: Colors.white,
    fontSize: FontSize.default,
    fontFamily: FontFamily.regular,
  },
  right: {
    marginRight: 10,
  },
  start: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.greenFaded,
  },
});
