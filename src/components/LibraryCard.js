import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {Touchable} from '@/components/Touchable';
import {start} from '@/Assets/Images';
import BlurImage from './BlurImage';

const LibraryCard = ({item, data, onPress}) => {
  const durationCall = num => {
    const duration = Number(Math.floor(num / 60));
    if (duration == 0) {
      return 1;
    } else {
      return duration + 5;
    }
  };

  return (
    <>
      {Number(item?.cat_id) == data?.id || item?.library_id == data?.id ? (
        <Touchable
          Opacity={0.7}
          style={styles.listView}
          onPress={() => onPress(item)}>
          <View style={styles.rowStart}>
            <BlurImage
              uri={item?.image}
              styles={styles.album}
              blurhash={item?.hash_code}
            />
            <View style={styles.artistList}>
              <View>
                <Text numberOfLines={1} style={styles.name}>
                  {item?.name}
                </Text>
                <View style={styles.bottom}>
                  {/* <Text numberOfLines={1} style={styles.description}>
                {item?.description}
              </Text> */}
                  <Text style={styles.artist}>
                    {durationCall(item?.duration)}m
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Image style={styles.icon} source={start} />
          </View>
        </Touchable>
      ) : null}
    </>
  );
};

export default React.memo(LibraryCard);

const styles = StyleSheet.create({
  listView: {
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: Sizes.height * 0.1,
    // width: Sizes.width * 0.95,
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryFaded,
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
    alignItems: 'flex-end',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  description: {
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.regular,
    fontFamily: FontFamily.medium,
  },
  artist: {
    color: Colors.white,
    fontSize: FontSize.default,
    fontFamily: FontFamily.regular,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
    resizeMode: 'contain',
  },
});
