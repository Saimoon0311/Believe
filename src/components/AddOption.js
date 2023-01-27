import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {Touchable} from './Touchable';

const AddOption = ({data, title, onIconClose, onPlaylistOpen, onPress}) => {
  const toggleFavorite = () => {
    onIconClose();
    onPress();
  };
  const favIcon = Boolean(data?.is_favorite == 'false');
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.heading}>
        {title}
      </Text>
      <View style={styles.subContainer}>
        <Touchable Opacity={0.7} onPress={onPlaylistOpen} style={styles.button}>
          <Text style={styles.text}>Add to Playlist</Text>
        </Touchable>
        {/* <Touchable Opacity={0.7} onPress={toggleFavorite} style={styles.button}>
          <Text style={styles.text}>
            {favIcon ? 'Remove from' : 'Add to'} Favorites
          </Text>
        </Touchable> */}
      </View>
    </View>
  );
};

export default AddOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // backgroundColor: Colors.darkFaded,
  },
  subContainer: {
    marginTop: 30,
  },
  heading: {
    fontSize: 22,
    textAlign: 'center',
    color: Colors.greenFaded,
    fontFamily: FontFamily.medium,
  },
  // button: {
  //   height: 50,
  //   width: '100%',
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   marginVertical: 20,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderColor: Colors.greenCard5,
  //   backgroundColor: Colors.greenFaded,
  // },
  button: {
    paddingVertical: 15,
    // borderBottomWidth: 0.5,
    // borderBottomColor: Colors.blurWhite,
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
});
