import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import BlurImage from './BlurImage';

const CategoryCard = ({item, data, libraryDetail}) => {
  return (
    <>
      {item?.library_id == data?.id ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.card}
          onPress={() => libraryDetail(item)}>
          <BlurImage
            uri={item?.image}
            styles={styles.boxData}
            blurhash={item?.hash_code}
          />
          <View style={styles.textContainer}>
            <Text numberOfLines={2} style={styles.heading}>
              {item?.name}
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default React.memo(CategoryCard);

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginBottom: '4%',
    marginRight: Sizes.width * 0.0325,
  },
  boxData: {
    height: 180,
    borderRadius: 10,
    width: Sizes.width * 0.4325,
  },
  textContainer: {
    bottom: 0,
    zIndex: 1,
    height: 60,
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
});
