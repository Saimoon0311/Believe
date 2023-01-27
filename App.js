import React, {useEffect, useRef, useState} from 'react';
import {LogBox, Text, TextInput, View, AppState, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {screensEnabled, enableFreeze} from 'react-native-screens';
import {verifyUser, fcmTokenAction} from '@/store/actions/auth-action';
import Navigation from './src/navigation/Navigation';
import useReduxStore from '@/hooks/useReduxStore';
import Overlay from '@/components/Overlay';
import {getOnBoardToken, getValue, hasKey} from '@/services/storage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Lottie from 'lottie-react-native';
import {fcmService} from '@/services/Notifications';
import {withIAPContext} from 'react-native-iap';
import TrackPlayer, {Event} from 'react-native-track-player';
import {playMusic, toggleMusic} from '@/store/actions/music-action';
import AnimatedView, {FadeIn, FadeOut} from 'react-native-reanimated';
import {splash} from '@/Assets/lottie';
import * as Images from '@/Assets/Images';
import cache from '@/utils/helper/cache';

enableFreeze(true);
screensEnabled(true);
const flexStyle = {flex: 1};
const preloadImages = () => {
  const images = [
    Images.background,
    Images.homeBackground,
    Images.profileBackground,
    Images.OnBoard1,
    Images.OnBoard2,
    Images.OnBoard3,
  ];

  const uris = images.map(image => ({
    uri: Image.resolveAssetSource(image).uri,
  }));
  // console.log('preloadImages', uris);
  FastImage.preload(uris);
};

LogBox.ignoreLogs([
  'Settings is not yet supported on Android',
  'ViewPropTypes will be removed',
  "exported from 'deprecated-react-native-prop-types'.",
  'Sending...',
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  const {dispatch, getState} = useReduxStore();
  const {loading, isLogin, appMusic, showAnimatedSplash} = getState('Auth');
  const appState = useRef(AppState.currentState);
  const onBoard = getOnBoardToken();
  const [splashIsLoaded, setSplashIsLoaded] = useState(false);

  useEffect(() => {
    /* It's a function that registers the device to receive push notifications. */
    if (isLogin)
      fcmService.register(onRegister, onOpenNotification, appState.current);
    return () => {
      /* It's a function that unregisters the device from receiving push notifications. */
      if (isLogin) fcmService.unRegister();
    };
  }, [isLogin]);

  const onRegister = fcm_token => {
    // console.log('fcm_token', fcm_token);
    dispatch(fcmTokenAction({fcm_token}));
  };

  const onOpenNotification = notify => {
    console.log('notify', notify);
  };
  const savesFiles = cache.get('downloadedFiles');
  if (savesFiles == null || savesFiles == undefined || savesFiles == {}) {
    cache.store('downloadedFiles', []);
  }
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      // console.log('appMusic', appMusic);
      if (appMusic) {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          dispatch(toggleMusic({play: false}));
        } else if (['inactive', 'background'].includes(nextAppState))
          dispatch(toggleMusic({play: true}));
      }
      appState.current = nextAppState;
      fcmService.setBadge();
    });

    TrackPlayer.addEventListener(Event.PlaybackQueueEnded, () => {
      if (appMusic) {
        TrackPlayer.seekTo(0);
        TrackPlayer.play();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [appMusic]);

  useEffect(() => {
    const background = hasKey('background')
      ? getValue('background') == 'true'
      : false;
    if (background) dispatch(playMusic({appMusic: background}));

    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
    View.defaultProps = View.defaultProps || {};
    View.defaultProps.allowFontScaling = false;
    preloadImages();
    /* It's a function that verifies if the user is logged in. */
    dispatch(verifyUser());

    // console.log(
    //   'create fun',
    //   createFolders(
    //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //     AllPaths[1],
    //   ),
    // );
  }, []);

  // const [time, setTime] = useState({
  //   seconds: 0,
  //   minutes: 0,
  //   hours: 0,
  // });
  // const [time, setTime] = useState(0);

  // useEffect(() => {
  //   let isCancelled = false;

  //   const advanceTime = () => {
  //     setTimeout(() => {
  //       let nSeconds = time;
  //       nSeconds++;
  //       !isCancelled && setTime(nSeconds);
  //     }, 1000);
  //   };
  //   // const advanceTime = () => {
  //   //   setTimeout(() => {
  //   //     let nSeconds = time.seconds;
  //   //     let nMinutes = time.minutes;
  //   //     let nHours = time.hours;

  //   //     nSeconds++;

  //   //     if (nSeconds > 59) {
  //   //       nMinutes++;
  //   //       nSeconds = 0;
  //   //     }
  //   //     if (nMinutes > 59) {
  //   //       nHours++;
  //   //       nMinutes = 0;
  //   //     }
  //   //     if (nHours > 24) {
  //   //       nHours = 0;
  //   //     }

  //   //     !isCancelled &&
  //   //       setTime({seconds: nSeconds, minutes: nMinutes, hours: nHours});
  //   //   }, 1000);
  //   // };
  //   advanceTime();

  //   return () => {
  //     //final time:
  //     clearTimeout(advanceTime);
  //     isCancelled = true;
  //     console.log(time);
  //   };
  // }, [time]);

  return (
    <GestureHandlerRootView style={flexStyle}>
      {!splashIsLoaded && (
        <AnimatedView.View
          style={flexStyle}
          entering={FadeIn.duration(300).delay(0)}
          exiting={FadeOut.duration(2000)}>
          <Lottie
            source={splash}
            autoPlay
            loop={false}
            onAnimationFinish={() => setSplashIsLoaded(true)}
            resizeMode="cover"
          />
        </AnimatedView.View>
      )}

      {splashIsLoaded && (
        <AnimatedView.View
          style={flexStyle}
          entering={FadeIn.duration(1500).delay(0)}
          exiting={FadeOut.duration(2000)}>
          <Navigation {...{isLogin, onBoard}} />
          {loading && splashIsLoaded && <Overlay />}
        </AnimatedView.View>
      )}
    </GestureHandlerRootView>
  );
};

export default withIAPContext(App);
