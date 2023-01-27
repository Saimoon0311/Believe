import {Alert} from 'react-native';
import {request, PERMISSIONS, check} from 'react-native-permissions';
const permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

const valid = ['granted'];

export const writePermission = () => {
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
            `Please allow media write for save file your current permission is ${askPermission}`,
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
