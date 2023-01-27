import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, BackHandler} from 'react-native';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {styles} from './styles';
import SafeArea from '@/components/SafeArea';
import SongCard from './SongCard';
import {randomNanoIdGenerator} from '@/utils/helper';

const track = [
  {
    id: 1,
    title: 'Avaritia',
    artist: 'Artist 1',
    url: require('../../Assets/tracks/audio1.mp3'),
    artwork: require('../../Assets/tracks/audio1.jpg'),
  },
  {
    id: 2,
    title: 'Coelacanth I',
    artist: 'Artist 2',
    url: require('../../Assets/tracks/audio1.mp3'),
    artwork: require('../../Assets/tracks/audio2.jpg'),
  },
  {
    id: 3,
    title: 'Ice Age',
    artist: 'Artist 3',
    url: require('../../Assets/tracks/audio1.mp3'),
    artwork: require('../../Assets/tracks/audio3.jpg'),
  },
  // {
  //   id: 4,
  //   title: 'Avaritia',
  //   artist: 'Artist 4',
  //   url: require('../../Assets/tracks/audio1.mp3'),
  //   artwork: require('../../Assets/tracks/audio1.jpg'),
  // },
  // {
  //   id: 5,
  //   title: 'Coelacanth I',
  //   artist: 'Artist 5',
  //   url: require('../../Assets/tracks/audios.mp3'),
  //   artwork: require('../../Assets/tracks/audio2.jpg'),
  // },
  // {
  //   id: 6,
  //   title: 'Ice Age',
  //   artist: 'Artist 6',
  //   url: require('../../Assets/tracks/audioss.mp3'),
  //   artwork: require('../../Assets/tracks/audio3.jpg'),
  // },
  // {
  //   id: 7,
  //   title: 'Avaritia',
  //   artist: 'Artist 7',
  //   url: require('../../Assets/tracks/audio1.mp3'),
  //   artwork: require('../../Assets/tracks/audio1.jpg'),
  // },
  // {
  //   id: 8,
  //   title: 'Coelacanth I',
  //   artist: 'Artist 8',
  //   url: require('../../Assets/tracks/audios.mp3'),
  //   artwork: require('../../Assets/tracks/audio2.jpg'),
  // },
  // {
  //   id: 9,
  //   title: 'Ice Age',
  //   artist: 'Artist 9',
  //   url: require('../../Assets/tracks/audioss.mp3'),
  //   artwork: require('../../Assets/tracks/audio3.jpg'),
  // },
  // {
  //   id: 10,
  //   title: 'Avaritia',
  //   artist: 'Artist 10',
  //   url: require('../../Assets/tracks/audio1.mp3'),
  //   artwork: require('../../Assets/tracks/audio1.jpg'),
  // },
  // {
  //   id: 11,
  //   title: 'Coelacanth I',
  //   artist: 'Artist 11',
  //   url: require('../../Assets/tracks/audios.mp3'),
  //   artwork: require('../../Assets/tracks/audio2.jpg'),
  // },
  // {
  //   id: 12,
  //   title: 'Ice Age',
  //   artist: 'Artist 12',
  //   url: require('../../Assets/tracks/audioss.mp3'),
  //   artwork: require('../../Assets/tracks/audio3.jpg'),
  // },
];

const Audio = () => {
  const {position, duration, buffered} = useProgress();
  const playerState = usePlaybackState();
  const isPlaying = playerState === State.Playing;
  // console.log('isPlaying', isPlaying);
  const [play, setPlay] = useState(false);
  const setSound = () => {
    if (play) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
    setPlay(!play);
  };

  const renderItem = useCallback(
    ({item, index}) => (
      <SongCard
        {...{
          item,
          index,
          position,
          duration,
          isPlaying,
          buffered,
          play,
          setSound,
          TrackPlayer,
        }}
      />
    ),
    [position],
  );

  const initiliazePlayer = useCallback(async () => {
    try {
      // await TrackPlayer.setupPlayer();
      await TrackPlayer.add(track);
      TrackPlayer.updateOptions({
        stopWithApp: true,
        // Media controls capabilities
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
          Capability.JumpForward,
          Capability.JumpBackward,
          Capability.SeekTo,
        ],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
          Capability.JumpForward,
          Capability.JumpBackward,
          Capability.SeekTo,
        ],

        // Icons for the notification on Android (if you don't like the default ones)
        // playIcon: require('./play-icon.png'),
        // pauseIcon: require('./pause-icon.png'),
        // stopIcon: require('./stop-icon.png'),
        // previousIcon: require('./previous-icon.png'),
        // nextIcon: require('./next-icon.png'),
        // icon: require('./notification-icon.png'),
      });
    } catch (error) {
      console.log(error);
    }
  });

  //   useEffect(() => {
  //     BackHandler.addEventListener('hardwareBackPress', hideFullScreen);
  //     return () => {
  //       setPlayer(initialState);
  //       hideFullScreen();
  //     };
  //     // return () => backHandler.remove();
  //   }, []);

  useEffect(() => {
    initiliazePlayer();
    return () => TrackPlayer.destroy();
  }, []);

  // useEffect(() => {
  //   const backAction = () => TrackPlayer.pause();

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);
  // const Play = () => TrackPlayer.play();
  // const Pause = () => TrackPlayer.pause();
  // const stopPlayer = () => TrackPlayer.stop();

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Track Player</Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={track}
            renderItem={renderItem}
            keyExtractor={randomNanoIdGenerator}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeArea>
  );
};

export default React.memo(Audio);
