import {useCallback, useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import useReduxStore from '@/hooks/useReduxStore';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';

const useAudioPlayer = ({navigation: {addListener, goBack}}) => {
  const {getState} = useReduxStore();
  const {playlistAudios} = getState('Content');
  const playerState = usePlaybackState();
  const isFinish = playerState === State.Stopped;
  const isPlayings = playerState === State.Playing;
  const {position, duration, buffered} = useProgress();
  const [isPlaying, setIsPlaying] = useState(isPlayings);
  const [loop, setloop] = useState(false);

  const setSound = () => {
    if (isPlaying) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
    setIsPlaying(prev => !prev);
  };

  const runOnLoop = () => {
    setloop(prev => !prev);
  };

  const closeAudio = () => {
    TrackPlayer.stop();
  };

  const goAudioBack = () => {
    closeAudio();
    goBack();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      closeAudio,
    );
    return () => backHandler.remove();
  }, []);

  const initiliazeTrack = useCallback(async () => {
    try {
      // await TrackPlayer.setupPlayer();s
      await TrackPlayer.add(playlistAudios);
      TrackPlayer.updateOptions({
        capabilities: [],
      });
      // TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    // console.log('Stopped', isFinish, position, duration);
    const audioFinish =
      (Math.floor(position) == Math.floor(duration) || isFinish) &&
      buffered != 0;
    if (audioFinish && !loop) {
      setSound();
      initiliazeTrack();
      console.log('No Loop');
    } else if (audioFinish && loop) {
      initiliazeTrack();
      TrackPlayer.play();
      console.log('Loop');
    }
  }, [isFinish, position, duration]);

  useEffect(() => {
    const event = addListener('focus', () => initiliazeTrack());
    return event;
  }, [playlistAudios]);

  return {isPlaying, loop, setSound, goAudioBack, runOnLoop};
};

export default useAudioPlayer;
