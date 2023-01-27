import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {Touchable} from './Touchable';
import {photo} from '@/Assets/Images';
import BlurImage from './BlurImage';

const EditCard = ({item, index, onPress, image}) => {
  return (
    <View key={index} style={styles.card}>
      <BlurImage
        uri={image?.uri || item?.image}
        styles={styles.boxData}
        blurhash={item?.hash_code}
      />
      <View style={styles.container}>
        <View />
        <Touchable
          Opacity={0.7}
          style={styles.button}
          onPress={onPress ? () => onPress() : null}>
          <Image source={photo} />
        </Touchable>
        <Text numberOfLines={2} style={styles.heading}>
          {item?.name}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(EditCard);

const styles = StyleSheet.create({
  card: {
    width: '45%',
    marginBottom: 20,
    marginHorizontal: 10,
    marginHorizontal: '2.5%',
  },
  boxData: {
    height: 170,
    width: '100%',
    borderRadius: 10,
  },
  container: {
    bottom: 0,
    zIndex: 1,
    height: 170,
    width: '100%',
    borderRadius: 10,
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: Colors.overlayColor,
  },
  heading: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  button: {
    padding: 15,
    borderRadius: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
});
