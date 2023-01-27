import React, {useCallback} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Touchable} from './Touchable';
import BlurImage from './BlurImage';
import {keyExtractor, randomNanoIdGenerator} from '@/utils/helper';

const HighlightedCard = ({data, newData, onPress}) => {
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <Touchable Opacity={0.7} key={index} style={styles.card} onPress={onPress}>
          <BlurImage
            uri={item?.image}
            styles={styles.boxData}
            blurhash={item?.hash_code}
          />
          <View style={styles.textContainer}>
            <Text numberOfLines={2} style={styles.heading}>
              {item?.heading}
            </Text>
            <View style={styles.rowEnd}>
              <Text numberOfLines={1} style={styles.subHeading}>
                {item?.time}
              </Text>
              <View style={styles.textBox}>
                <FontAwesome name="circle" size={5} color={Colors.lightGray} />
                <Text numberOfLines={1} style={styles.time}>
                  {item?.title}
                </Text>
              </View>
            </View>
          </View>
          {/* <View style={styles.boxBar} /> */}
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
        listKey={(x, i) => i.toString()}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HighlightedCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Sizes.width * 0.025,
  },
  boxData: {
    height: 180,
    borderRadius: 10,
    width: Sizes.width * 0.425,
  },
  textContainer: {
    bottom: 0,
    zIndex: 1,
    height: 75,
    width: '100%',
    paddingRight: 5,
    paddingLeft: 8.5,
    position: 'absolute',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.gray2,
  },
  boxBar: {
    bottom: 0,
    height: 75,
    // opacity: 0.5,
    position: 'absolute',
    width: Sizes.width * 0.425,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Colors.gray2,
    // backgroundColor: Colors.grayScale,
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
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    width: '90%',
  },
  time: {
    fontSize: 10,
    marginLeft: 5,
    textAlign: 'left',
    color: Colors.grayScale,
    textTransform: 'uppercase',
    fontFamily: FontFamily.regular,
  },
});
