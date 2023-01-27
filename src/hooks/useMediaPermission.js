import {Platform, Alert} from 'react-native';
import {request, PERMISSIONS, check} from 'react-native-permissions';
const permission =
  Platform.OS == 'ios'
    ? PERMISSIONS.IOS.PHOTO_LIBRARY
    : PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION;
const valid = ['granted', 'limited'];
export const mediaPermission = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const hasPermission = await hasMediaPermission(permission);
      if (valid.includes(hasPermission)) resolve(true);
      else {
        const askPermission = await request(permission);
        if (valid.includes(askPermission)) resolve(true);
        else {
          resolve(false);
          Alert.alert(
            `Please allow media for using Media status is ${askPermission}`,
          );
        }
        console.log(
          'askPermission',
          askPermission,
          'hasPermission',
          hasPermission,
        );
      }
    } catch (error) {
      console.log(error);
      reject(false);
    }
  });
};

export const hasMediaPermission = () => check(permission);
