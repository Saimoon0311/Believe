import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import FastImage from 'react-native-fast-image';
import BlurImage from './BlurImage';
import {Touchable} from './Touchable';

const CategoryImage = ({data, viewReviews}) => {
  return (
    <View style={styles.card}>
      {/* <FastImage
        style={styles.boxData}
        source={{
          uri: data?.image,
          priority: FastImage.priority.high,
        }}
      /> */}
      <BlurImage
        styles={styles.boxData}
        uri={data?.image}
        blurhash={data?.hash_code}
      />
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{data?.title}</Text>
          <Text style={styles.author}>Victoria Gallagher</Text>
        </View>
        {/* <Touchable onPress={viewReviews} Opacity={0.7}>
          <Text style={styles.reviews}>Check Reviews</Text>
        </Touchable> */}
      </View>
      {/* <Text style={styles.author}>{data?.description}</Text> */}
    </View>
  );
};

export default React.memo(CategoryImage);

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginBottom: 20,
  },
  boxData: {
    height: 200,
    width: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginTop: '3%',
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  author: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  reviews: {
    fontSize: 14,
    textAlign: 'right',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
});
