import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {durationCall, viewsFormatter} from '@/utils/helper';
import {Touchable} from './Touchable';
import BlurImage from './BlurImage';

const ViewAllCard = ({item, index, newData, onPress}) => {
  return (
    <Touchable
      key={index}
      Opacity={0.7}
      style={styles.card}
      onPress={() => onPress(item)}
      // onPress={item?.category ? () => onPress(item) : null}
    >
      <BlurImage
        uri={item?.image}
        styles={styles.boxData}
        blurhash={item?.hash_code}
      />
      <View style={styles.textContainer}>
        <View style={styles.ninety}>
          <Text numberOfLines={1} style={styles.heading}>
            {item?.name}
          </Text>
          {newData ? (
            <Text numberOfLines={1} style={styles.subHeading}>
              {viewsFormatter(item?.views)} Views
            </Text>
          ) : (
            <Text numberOfLines={1} style={styles.subHeading}>
              {durationCall(item?.duration)}
            </Text>
          )}
        </View>
      </View>
    </Touchable>
  );
};

export default React.memo(ViewAllCard);

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  boxData: {
    height: 200,
    width: '100%',
    borderRadius: 10,
  },
  textContainer: {
    bottom: 0,
    zIndex: 1,
    width: '100%',
    height: '35%',
    paddingHorizontal: 20,
    paddingBottom: 7.5,
    position: 'absolute',
    justifyContent: 'space-around',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.overlayColor,
  },
  ninety: {
    width: '90%',
  },
  heading: {
    fontSize: 18,
    width: '90%',
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  subHeading: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'left',
    color: Colors.grayScale,
    fontFamily: FontFamily.regular,
  },
});
