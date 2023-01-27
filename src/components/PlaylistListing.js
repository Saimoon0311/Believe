import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {Touchable} from './Touchable';

const PlaylistListing = ({item, index, onPress}) => {
  return (
    <Touchable
      key={index}
      Opacity={0.7}
      style={styles.card}
      onPress={() => onPress(item)}>
      <Text numberOfLines={1} style={styles.heading}>
        {item?.name}
      </Text>
    </Touchable>
  );
};

export default React.memo(PlaylistListing);

const styles = StyleSheet.create({
  card: {
    paddingVertical: 15,
  },
  heading: {
    fontSize: 16,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
});
