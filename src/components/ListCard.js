import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize} from '@/theme/Variables';
import {Touchable} from '@/components/Touchable';
import {pick} from '@/Assets/Images';

const ListCard = ({item, marked, onPress}) => {
  const selectTrack = () => onPress(item);
  return (
    <Touchable onPress={selectTrack} Opacity={0.7} style={styles.listView}>
      <View style={styles.artistList}>
        <Text numberOfLines={1} style={styles.name}>
          {item?.title}
        </Text>
      </View>
      {marked?.id == item?.id && <Image source={pick} style={styles.check} />}
    </Touchable>
  );
};

export default React.memo(ListCard);

const styles = StyleSheet.create({
  listView: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    // paddingHorizontal: 10,
    borderBottomColor: Colors.white,
    justifyContent: 'space-between',
  },
  artistList: {
    width: '75%',
  },
  name: {
    color: Colors.white,
    fontSize: FontSize.large,
    fontFamily: FontFamily.regular,
  },
  check: {
    width: 18,
    height: 18,
    marginRight: 20,
    resizeMode: 'contain',
  },
});
