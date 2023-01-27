import useReduxStore from '@/hooks/useReduxStore';
import {logOutUser} from '@/store/actions/auth-action';
import InAppReview from 'react-native-in-app-review';
import {Alert, Linking} from 'react-native';
import cache from '@/utils/helper/cache';
import {deleteAllFiles} from '@/services/DownloadServices';
import {showError, showSuccess} from '@/services/SnackBar';
import {useEffect, useState} from 'react';
import {store} from '@/store/store';

const useMe = ({navigate}) => {
  const {getState, dispatch} = useReduxStore();
  const user = getState('Auth');
  const logOutHandler = () => {
    // deleteDownloads(true);
    dispatch(logOutUser());
  };
  const [audioPath, setAudioPath] = useState([]);
  const [imagePath, setImagePath] = useState([]);

  const showAlert = () => {
    Alert.alert(
      'Clear Downloads',
      'Are you sure you want to delete all downloaded content?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteDownloads()},
      ],
    );
  };

  const deleteDownloads = async type => {
    try {
      const downloadFiles = cache.get('downloadedFiles');
      if (downloadFiles != null && downloadFiles.length > 0) {
        await downloadFiles.map(res => {
          imagePath.push(res.cover_image || res.image);
        });
        await downloadFiles.map(res => {
          audioPath.push(res.path);
        });
        await deleteAllFiles(imagePath);
        await deleteAllFiles(audioPath);
        cache.store('downloadedFiles', []);
        !type && showSuccess('All download file has been deleted');
      } else !type && showError('No downloads found!');
    } catch (error) {
      console.log('25', error);
    }
  };
  // const aboutRoute = () =>
  //   navigate('Browser', {
  //     uri: 'https://virtualrealitycreators.com/Believe-Backend/about-believe',
  //   });

  const triggerReview = () => {
    if (!InAppReview.isAvailable) return;

    // trigger UI InAppreview
    InAppReview.RequestInAppReview()
      .then(hasFlowFinishedSuccessfully => {
        // when return true in android it means user finished or close review flow
        console.log('InAppReview in android', hasFlowFinishedSuccessfully);

        // when return true in ios it means review flow lanuched to user.
        console.log(
          'InAppReview in ios has launched successfully',
          hasFlowFinishedSuccessfully,
        );

        // 1- you have option to do something ex: (navigate Home page) (in android).
        // 2- you have option to do something,
        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

        // 3- another option:
        if (hasFlowFinishedSuccessfully) {
          // do something for ios
          // do something for android
        }

        // for android:
        // The flow has finished. The API does not indicate whether the user
        // reviewed or not, or even whether the review dialog was shown. Thus, no
        // matter the result, we continue our app flow.

        // for ios
        // the flow lanuched successfully, The API does not indicate whether the user
        // reviewed or not, or he/she closed flow yet as android, Thus, no
        // matter the result, we continue our app flow.
      })
      .catch(error => {
        //we continue our app flow.
        // we have some error could happen while lanuching InAppReview,
        // Check table for errors and code number that can return in catch.
        console.log(error);
      });
  };

  const helpRoute = () =>
    Linking.openURL(
      'mailto:orders@hyptalk.com?subject=Help and Support - Believe App',
    ).then(() => console.log('success '));

  return {
    user,
    logOutHandler,
    helpRoute,
    triggerReview,
    deleteDownloads: showAlert,
  };
};

export default useMe;
