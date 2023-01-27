import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, BackHandler, Image, StyleSheet} from 'react-native';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {Colors, FontFamily} from '@/theme/Variables';
import {Slider} from '@miblanchard/react-native-slider';
import {Touchable} from './Touchable';
import {
  addFolder,
  backward,
  forward,
  help,
  pauseButton,
  playButton,
} from '@/Assets/Images';
import BlurImage from './BlurImage';
import FastImage from 'react-native-fast-image';
import {contentTime} from '@/utils/helper';

const AudioPlayer = ({data, hideLoader}) => {
  const {position, duration, buffered} = useProgress();
  const playerState = usePlaybackState();
  console.log('buffered', buffered);
  const isPlaying = playerState === State.Playing;
  const isFinish = playerState === State.Stopped;
  //   console.log('isPlaying', isPlaying);
  //   const [play, setPlay] = useState(false);
  const [play, setPlay] = useState(isPlaying);
  //   console.log('play', play);
  const setSound = () => {
    if (play) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
    setPlay(!play);
  };

  const initiliazePlayer = useCallback(async () => {
    try {
      // await TrackPlayer.setupPlayer();
      await TrackPlayer.add(data);
      //   await TrackPlayer.add(track);
      TrackPlayer.updateOptions({
        // stopWithApp: false,
        // Media controls capabilities
        capabilities: [
          // Capability.Play,
          // Capability.Pause,
          //   Capability.SkipToNext,
          //   Capability.SkipToPrevious,
          //   Capability.Stop,
          //   Capability.JumpForward,
          //   Capability.JumpBackward,
          //   Capability.SeekTo,
          //   Capability.Bookmark,
        ],
      });
    } catch (error) {
      console.log(error);
    }
  });

  const onSlide = async slide => {
    await TrackPlayer.seekTo(slide * duration);
  };

  const backwardAudio = () => {
    TrackPlayer.seekTo(position - 30);
  };

  const forwardAudio = () => {
    TrackPlayer.seekTo(position + 30);
  };

  const closeAudio = () => {
    TrackPlayer.stop();
    console.log('back');
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      closeAudio,
    );
    return () => backHandler.remove();
    // return () => backHandler.remove();
  }, []);

  useEffect(() => {
    initiliazePlayer();
    return () => TrackPlayer.destroy();
  }, []);

  useEffect(() => {
    if (Math.floor(duration) != 0) hideLoader();
  }, [duration]);

  useEffect(() => {
    console.log('Stopped', isFinish, position, duration);
    if (
      (Math.floor(position) == Math.floor(duration) || isFinish) &&
      buffered != 0
    ) {
      TrackPlayer.seekTo(0);
      setSound();
    }
  }, [isFinish, position, duration]);
  // useEffect(() => {
  //   console.log('Stopped', isFinish);
  //   if (isFinish && buffered != 0) {
  //     // if (Math.floor(position) == Math.floor(duration)) {
  //     TrackPlayer.stop();
  //     setSound();
  //   } else if (Math.floor(position) == Math.floor(duration)) {
  //     TrackPlayer.stop();
  //     // setSound();
  //   }
  // }, [isFinish]);

  return (
    <View style={styles.listContainer}>
      <View>
        <View style={styles.card}>
          {/* <Image style={styles.image} source={data?.image} /> */}
          <FastImage
            style={styles.image}
            source={{
              uri: data?.image,
              priority: FastImage.priority.high,
            }}
          />
          {/* <BlurImage styles={styles.image} uri={data?.image} blurhash={data?.hash_code} /> */}
        </View>
        <Slider
          value={position / duration}
          containerStyle={styles.slider}
          onSlidingComplete={onSlide}
          //   onValueChange={onSlide}
          thumbStyle={styles.thumb}
          minimumTrackTintColor={Colors.white}
          maximumTrackTintColor={Colors.blurWhite1}
          thumbTintColor={Colors.white}
        />
        <View style={styles.rowEnd}>
          <Text style={styles.position}>
            {contentTime(position)}
            {/* {new Date(position * 1000).toLocaleTimeString().substring(3)} */}
          </Text>
          <Text style={styles.duration}>
            {contentTime(duration)}
            {/* {new Date(duration * 1000).toLocaleTimeString().substring(3)} */}
          </Text>
        </View>
        <Text style={styles.contentTitle}>{data?.title}</Text>
        <View style={styles.controllers}>
          <Touchable Opacity={0.7}>
            <Image style={styles.cornerButton} source={help} />
          </Touchable>
          <View style={styles.center}>
            <Touchable onPress={backwardAudio} Opacity={0.7}>
              <Image style={styles.centerButton} source={backward} />
            </Touchable>
            <Touchable Opacity={0.7} style={styles.button} onPress={setSound}>
              <Image
                style={styles.playerButton}
                source={play ? pauseButton : playButton}
                // source={isPlaying ? pauseButton : playButton}
              />
            </Touchable>
            <Touchable onPress={forwardAudio} Opacity={0.7}>
              <Image style={styles.centerButton} source={forward} />
            </Touchable>
          </View>
          <Touchable Opacity={0.7}>
            <Image style={styles.cornerButton} source={addFolder} />
          </Touchable>
        </View>
      </View>
    </View>
  );
};

export default React.memo(AudioPlayer);

const styles = StyleSheet.create({
  listContainer: {
    // flex: 1,
    height: '90%',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  card: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: '90%',
    borderRadius: 10,
  },
  slider: {
    height: 15,
    width: '100%',
  },
  thumb: {
    width: 13.25,
    height: 13.25,
  },
  rowEnd: {
    marginTop: 7.5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  position: {
    fontSize: 13,
    textAlign: 'left',
    color: Colors.blurWhite2,
    fontFamily: FontFamily.regular,
  },
  duration: {
    fontSize: 13,
    textAlign: 'right',
    color: Colors.blurWhite2,
    fontFamily: FontFamily.regular,
  },
  contentTitle: {
    fontSize: 22,
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 20,
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  controllers: {
    // width: '100%',
    paddingVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cornerButton: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: Colors.blurWhite2,
  },
  center: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerButton: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 180,
    alignItems: 'center',
    resizeMode: 'contain',
    justifyContent: 'center',
    backgroundColor: Colors.buttonBlue,
  },
  playerButton: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
});
