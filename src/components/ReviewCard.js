import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {AirbnbRating} from 'react-native-ratings';
import BlurImage from './BlurImage';

const ReviewCard = ({item, index}) => {
  return (
    <View key={index} style={styles.card}>
      <View>
        <View style={styles.rowCenter}>
          <BlurImage
            styles={styles.boxData}
            uri={item?.user?.profile_image}
            blurhash={item?.user?.hash_code}
          />
          <View style={styles.padding}>
            <Text numberOfLines={2} style={styles.heading}>
              {item?.user?.name}
            </Text>
            <AirbnbRating
              selectedColor={Colors.rating}
              showRating={false}
              size={20}
              defaultRating={item?.rating}
              isDisabled
            />
          </View>
        </View>
        <Text numberOfLines={1} style={styles.review}>
          {item?.review}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(ReviewCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 20,
    // width: '45%',
    // marginBottom: 20,
    // borderRadius: 20,
    // marginHorizontal: 10,
    // marginHorizontal: '2.5%',
  },
  rowCenter: {
    width: '85%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxData: {
    width: 50,
    height: 50,
    borderRadius: 180,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  review: {
    fontSize: 14,
    marginTop: '5%',
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  padding: {
    paddingLeft: 10,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  starStyle: {
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'flex-start',
  },
});
