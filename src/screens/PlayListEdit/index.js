import React from 'react';
import {View, Button} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {hasMediaPermission, mediaPermission} from '@/hooks/useMediaPermission';

const PlayListEdit = () => {
  const launchImageLibrarys = async () => {
    hasMediaPermission().then(res => {
      if (res !== 'granted') mediaPermission();
      else {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(
          options,
          ({assets, didCancel, errorMessage, errorCode}) => {
            console.log('Response=', {
              assets,
              didCancel,
              errorMessage,
              errorCode,
            });
            if (didCancel) console.log('User cancelled image picker');
            else if (errorMessage)
              console.log('ImagePicker errorMessage: ', errorMessage);
            else setImage(assets[0]);
          },
        );
      }
    });
  };

  return (
    <View>
      <Button title="Image Picker" onPres={launchImageLibrarys} />
    </View>
  );
};

export default PlayListEdit;
