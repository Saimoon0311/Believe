import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize} from '@/theme/Variables';
import {Touchable} from '@/components/Touchable';
import {pick} from '@/Assets/Images';
import BlurImage from './BlurImage';

const BackgroundCard = ({item, marked, onPress}) => {
  return (
    <View style={styles.listView}>
      <Touchable onPress={() => onPress(item)} Opacity={0.7}>
        <BlurImage
          radius={0.1}
          styles={styles.image}
          blurhash={item?.hash_code}
          uri={item?.background_image}
        />
        <View style={styles.artistList}>
          <Text numberOfLines={2} style={styles.name}>
            {item?.title}
          </Text>
          {marked?.id == item?.id && (
            <Image source={pick} style={styles.check} />
          )}
        </View>
      </Touchable>
    </View>
  );
};

export default React.memo(BackgroundCard);

const styles = StyleSheet.create({
  listView: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  artistList: {
    paddingTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    width: '65%',
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.large,
    fontFamily: FontFamily.regular,
  },
  check: {
    width: 15,
    height: 15,
    marginRight: 10,
    resizeMode: 'contain',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
