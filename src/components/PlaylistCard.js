import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {Touchable} from './Touchable';
import BlurImage from './BlurImage';

const PlaylistCard = ({item, index, onPress, disable}) => {
  const playListHandler = () => onPress(item);
  return (
    <Touchable
      key={index}
      Opacity={disable ? 1 : 0.7}
      style={styles.card}
      onPress={!disable ? playListHandler : null}>
      <BlurImage
        uri={item?.image}
        styles={styles.boxData}
        blurhash={item?.blurhash}
      />
      <View style={styles.textContainer}>
        <Text numberOfLines={2} style={styles.heading}>
          {item?.name}
        </Text>
        <Text numberOfLines={1} style={styles.subHeading}>
          {item?.tracks_length || 0} Tracks
        </Text>
      </View>
    </Touchable>
  );
};

export default React.memo(PlaylistCard);

const styles = StyleSheet.create({
  card: {
    width: '45%',
    marginBottom: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    marginHorizontal: '2.5%',
  },
  boxData: {
    height: 170,
    width: '100%',
    borderRadius: 10,
  },
  textContainer: {
    bottom: 0,
    zIndex: 1,
    height: 75,
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
  },

  subHeading: {
    fontSize: 11,
    marginTop: 2.5,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
});
