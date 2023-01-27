import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {keyExtractor, minuteCall} from '@/utils/helper';
import BlurImage from './BlurImage';
import SubscribeCheck from './SubscribeCheck';

const RecentCard = ({data, view, onPress}) => {
  const renderItem = ({item}) => (
    <SubscribeCheck style={styles.boxData} item={item} onPress={onPress}>
      <BlurImage
        uri={item?.image}
        styles={styles.boxData}
        blurhash={item?.hash_code}
      />
      <View style={styles.textContainer(view)}>
        <Text numberOfLines={2} style={styles.heading}>
          {item?.name}
        </Text>
        {view && (
          <View style={styles.rowEnd}>
            <Text numberOfLines={1} style={styles.subHeading}>
              {minuteCall(item?.duration)} MIN
            </Text>
            <FontAwesome name="circle" size={5} color={Colors.lightGray} />
          </View>
        )}
      </View>
    </SubscribeCheck>
  );

  return (
    <View style={{paddingHorizontal: 10}}>
      <FlatList
        numColumns={2}
        bounces={false}
        renderItem={renderItem}
        data={data?.slice(0, 4)}
        listKey={keyExtractor}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default React.memo(RecentCard);

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 20,
    marginHorizontal: Sizes.width * 0.015,
  },
  boxData: {
    height: 180,
    borderRadius: 10,
    width: Sizes.width * 0.45,
  },
  textContainer: view => ({
    bottom: 0,
    zIndex: 1,
    height: 60,
    width: '100%',
    paddingLeft: 12.5,
    paddingRight: 7.5,
    position: 'absolute',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.overlayColor,
    height: view ? 75 : 50,
  }),
  heading: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  rowEnd: {
    width: '90%',
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeading: {
    fontSize: 10,
    paddingRight: 5,
    textAlign: 'left',
    color: Colors.grayScale,
    textTransform: 'uppercase',
    fontFamily: FontFamily.regular,
  },
});
