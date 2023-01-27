import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import BackButton from './BackButton';
import {Touchable} from './Touchable';
import {addPlaylist} from '@/Assets/Images';

const AddPlaylistHeader = ({title, navigation, onOpen}) => {
  return (
    <View style={styles.container}>
      <BackButton {...{navigation}} />
      <Text numberOfLines={1} style={styles.heading}>
        {title}
      </Text>
      <Touchable onPress={onOpen} activeOpacity={0.7}>
        <Image source={addPlaylist} style={styles.icon} />
      </Touchable>
    </View>
  );
};

export default AddPlaylistHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  heading: {
    width: '75%',
    fontSize: 22,
    marginRight: '5%',
    textAlign: 'center',
    color: Colors.white,
    paddingVertical: 20,
    fontFamily: FontFamily.medium,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});
