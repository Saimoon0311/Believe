import useReduxStore from '@/hooks/useReduxStore';
import {useCallback, useEffect, useState, useRef} from 'react';
import {BackHandler} from 'react-native';
import TrackPlayer from 'react-native-track-player';

const useSessionTimer = (navigation, {params}) => {
  const {meditation, background, startBell, endBell} = params;
  const [time, setTime] = useState(meditation);
  const [isComplete, setIsComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bell, setBell] = useState(false);
  const timeRef = useRef(null);

  const {getState} = useReduxStore();

  const {homeContent} = getState('Content');

  const onComplete = () => {
    TrackPlayer.reset();
    initiliazeTrack(endBell);
    TrackPlayer.play();
    setSound();
    setIsComplete(true);
  };

  const setSound = () => {
    if (!bell && !isPlaying) {
      setBell(true);
      TrackPlayer.play();
      // timeRef.current = setTimeout(() => {
      //   TrackPlayer.reset();
      //   initiliazeTrack(endBell);
      //   clearTimeout(timeRef.current);
      // }, 5000);
    }
    setIsPlaying(prev => !prev);
  };

  const closeAudio = () => {
    TrackPlayer.stop();
    setTime(0);
  };
  const initiliazeTrack = useCallback(async dataTrack => {
    try {
      await TrackPlayer.add(dataTrack);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const gestureEnd = navigation.addListener('gestureEnd', e => closeAudio());

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      closeAudio,
    );

    TrackPlayer.setupPlayer()
      .then(() => initiliazeTrack(startBell))
      .catch(err => console.log('error'));

    return () => {
      TrackPlayer.destroy();
      backHandler.remove();
      gestureEnd();
    };
  }, []);

  return {
    time,
    data: params,
    isComplete,
    background,
    isPlaying,
    setSound,
    onComplete,
    closeAudio,
    homeContent,
  };
};

export default useSessionTimer;

// const useSound = tracks => {
//   const {position, duration} = useProgress();
//   const [trackFinish, setTrackFinish] = useState(false);
//   const [queueFinish, setQueueFinish] = useState(false);
//   const playerState = usePlaybackState();
//   const isPlaying = Boolean(playerState == 'playing' || playerState == 3);
//   const play = async () => {
//     TrackPlayer.play();
//   };

//   const pause = async () => {
//     TrackPlayer.pause();
//   };

//   const stop = async () => {
//     TrackPlayer.reset();
//   };
//   const seek = async () => {
//     TrackPlayer.seekTo(12.5);
//   };
//   const next = async () => {
//     TrackPlayer.skipToNext();
//   };
//   const back = async () => {
//     TrackPlayer.skipToPrevious();
//   };

//   const add = async () => {
//     try {
//       await TrackPlayer.add(tracks);
//     } catch (error) {
//       console.log('TrackPlayer.add', error);
//     }
//   };
//   const reset = () => TrackPlayer.reset();

//   useTrackPlayerEvents(events, async event => {
//     const {nextTrack, type} = event;
//     switch (type) {
//       case Event.PlaybackTrackChanged:
//         if (nextTrack && nextTrack !== undefined) {
//           console.log('PlaybackTrackChanged');
//           setTrackFinish(true);
//         }
//         break;
//       case Event.PlaybackQueueEnded:
//         if (tracks?.length - 1 && !false) {
//           setQueueFinish(prev => !prev);
//           setTrackFinish(false);
//           reset();
//           console.log('PlaybackQueueEnded');
//         }
//         break;
//       default:
//         break;
//     }
//   });

//   useEffect(() => {
//     TrackPlayer.setupPlayer().then(async () => {
//       await TrackPlayer.setRepeatMode(RepeatMode.Off);
//       console.log('setupPlayer useSound');
//     });
//     if (tracks?.length) add();
//     return () => {
//       TrackPlayer.destroy();
//     };
//   }, []);

//   return {
//     play,
//     add,
//     stop,
//     pause,
//     next,
//     back,
//     isFinish: true,
//     position,
//     duration,
//     isPlaying,
//   };
// };
