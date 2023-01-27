import React from 'react';
import {script} from '@/Assets/Images';
import {Touchable} from '@/components/Touchable';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import BlurImage from './BlurImage';
import {contentTime} from '@/utils/helper';

const SeriesCard = ({item, data, onPress}) => {
  return (
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
          <Text numberOfLines={1} style={styles.name}>
            {item?.name}
          </Text>
          <Text numberOfLines={1} style={styles.description}>
            {item?.description}
          </Text>
          <Text style={styles.duration}>{contentTime(item?.duration)}min</Text>
        </View>
      </View>
      <View style={styles.button}>
        <Image source={script} style={styles.icons} />
      </View>
    </Touchable>
  );
};

export default React.memo(SeriesCard);

const styles = StyleSheet.create({
  listView: {
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: Sizes.height * 0.1,
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
    width: '67.5%',
    marginLeft: 10,
    height: Sizes.height * 0.07,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: {
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.medium,
  },
  description: {
    fontSize: 12,
    width: '87.5%',
    textAlign: 'left',
    // paddingVertical: 5,
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  duration: {
    fontSize: 12,
    textAlign: 'left',
    color: Colors.lightGray2,
    fontFamily: FontFamily.regular,
  },
  button: {
    width: 40,
    height: 30,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: Colors.greenFaded,
  },
});
