import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Touchable} from './Touchable';
import {Colors, FontFamily} from '@/theme/Variables';
import InputPlaylist from './InputPlaylist';
import DualButton from './DualButton';

const AddPlaylist = ({
  onClose,
  errors,
  control,
  onSubmit,
  handleSubmit,
  dual,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Playlist</Text>
      <View style={styles.subContainer}>
        <InputPlaylist
          {...{
            name: 'name',
            label: 'Name',
            placeholder: 'Enter playlist name',
            errors,
            control,
            isRequired: true,
            defaultValue: '',
            // defaultValue: 'My Playlist',
          }}
        />
        {/* <Touchable Opacity={0.7} style={styles.button} onPress={onClose}> */}
        {dual ? (
          <DualButton
            {...{onPress, title2: 'Ok', onSubmit, handleSubmit, dual}}
          />
        ) : (
          <Touchable
            Opacity={0.7}
            style={styles.button}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.text}>Create Playlist</Text>
          </Touchable>
        )}
      </View>
    </View>
  );
};

export default AddPlaylist;

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
  button: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.greenCard5,
    backgroundColor: Colors.greenFaded,
  },
  // button: {
  //   paddingVertical: 10,
  //   borderBottomWidth: 0.5,
  //   borderBottomColor: Colors.blurWhite,
  // },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
});
