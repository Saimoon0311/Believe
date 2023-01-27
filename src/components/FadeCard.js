import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {minuteCall, viewsFormatter} from '@/utils/helper';
import * as images from '@/Assets/Images';
// import {Touchable} from './Touchable';
import BlurImage from './BlurImage';
import SubscribeCheck from './SubscribeCheck';

const FadeCard = ({data, newData, onPress}) => {
  const renderItem = (item, index) => {
    const half = minuteCall(item?.duration);
    return (
      <SubscribeCheck
        key={index}
        style={styles.boxData}
        item={item}
        onPress={onPress}>
        <BlurImage
          uri={item?.image}
          styles={styles.boxData}
          blurhash={item?.hash_code}>
          <View style={styles.textContainer}>
            <Text numberOfLines={2} style={styles.heading}>
              {item?.name}
            </Text>
            <View style={styles.rowCenter}>
              <Image source={images[item?.type]} style={styles.icon} />
              <Text numberOfLines={1} style={styles.type}>
                {item?.type}
              </Text>
            </View>
            {/* {
            halfTime ? (
              <Text style={styles.halftime}>
                {half == 1 ? 0 : Math.round(half / 2)}-{half} min
              </Text>
            ) 
            : (
              
            )} */}
            <View style={styles.rowEnd}>
              {newData ? (
                <Text numberOfLines={1} style={styles.subHeading}>
                  {half} MIN
                </Text>
              ) : (
                <Text numberOfLines={1} style={styles.subHeading}>
                  {viewsFormatter(item?.views)} Views
                </Text>
              )}
              <View style={styles.textBox}>
                {newData && (
                  <FontAwesome
                    size={5}
                    name="circle"
                    color={Colors.lightGray}
                  />
                )}
                <Text numberOfLines={1} style={styles.time}>
                  {newData ? item?.category?.name : ''}
                </Text>
              </View>
            </View>
          </View>
        </BlurImage>
      </SubscribeCheck>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      horizontal>
      {data?.map(renderItem)}
    </ScrollView>
  );
};

export default FadeCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  boxData: {
    height: 260,
    borderRadius: 10,
    width: Sizes.width * 0.425,
  },
  textContainer: {
    bottom: 0,
    zIndex: 1,
    height: 100,
    width: '100%',
    paddingVertical: 10,
    position: 'absolute',
    paddingHorizontal: 8.5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.gray2,
    justifyContent: 'space-between',
  },
  boxBar: {
    bottom: 0,
    height: 75,
    position: 'absolute',
    width: Sizes.width * 0.425,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.gray2,
  },
  heading: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  subHeading: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'left',
    color: Colors.grayScale,
    fontFamily: FontFamily.regular,
  },
  halftime: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'left',
    color: Colors.lightGray2,
    fontFamily: FontFamily.regular,
  },
  textBox: {
    width: '80%',
    marginLeft: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  time: {
    fontSize: 10,
    marginLeft: 5,
    textAlign: 'left',
    color: Colors.grayScale,
    textTransform: 'uppercase',
    fontFamily: FontFamily.regular,
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 17.5,
    height: 17.5,
    resizeMode: 'contain',
  },
  type: {
    fontSize: 12,
    paddingLeft: 5,
    textAlign: 'left',
    color: Colors.white,
    textTransform: 'capitalize',
    fontFamily: FontFamily.medium,
  },
});
