import React, {useCallback} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {minuteCall, randomNanoIdGenerator} from '@/utils/helper';
import {Touchable} from './Touchable';
import BlurImage from './BlurImage';

const BoxCard = ({data, onPress}) => {
  const renderItem = useCallback(
    ({item, index}) => {
      const onPressButton = () => onPress(item);
      return (
        <Touchable key={index} onPress={onPressButton} Opacity={0.7}>
          <View style={styles.card}>
            <BlurImage
              uri={item?.image}
              styles={styles.boxData}
              blurhash={item?.hash_code}
            />
            <View style={styles.textContainer}>
              <Text numberOfLines={2} style={styles.heading}>
                {item?.name}
              </Text>
              <View style={styles.rowEnd}>
                <Text numberOfLines={1} style={styles.subHeading}>
                  {item?.category?.name}
                </Text>
                <View style={styles.textBox}>
                  <FontAwesome
                    size={5}
                    name="circle"
                    color={Colors.lightGray}
                  />
                  <Text numberOfLines={1} style={styles.time}>
                    {minuteCall(item?.duration)} min
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Touchable>
      );
    },
    [data],
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        bounces={false}
        renderItem={renderItem}
        keyExtractor={randomNanoIdGenerator}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default BoxCard;

const styles = StyleSheet.create({
  container: {
    // marginLeft: 10,
  },
  card: {
    borderRadius: 10,
    marginLeft: Sizes.width * 0.025,
    marginRight: Sizes.width * 0.02,
  },
  boxData: {
    height: 120,
    borderRadius: 10,
    paddingHorizontal: 15,
    // resizeMode: 'contain',
    width: Sizes.width * 0.4,
  },
  textContainer: {
    paddingTop: 10,
    paddingLeft: 2.5,
    width: Sizes.width * 0.38,
  },
  heading: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  subHeading: {
    fontSize: 12,
    marginTop: 5,
    maxWidth: 120,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  textBox: {
    marginLeft: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  time: {
    maxWidth: 85,
    fontSize: 12,
    marginLeft: 5,
    textAlign: 'left',
    color: Colors.white,
    textTransform: 'uppercase',
    fontFamily: FontFamily.regular,
  },
});
