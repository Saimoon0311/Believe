import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, BackHandler, Image, StyleSheet} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  useProgress,
  Capability,
} from 'react-native-track-player';
import {Colors, FontFamily} from '@/theme/Variables';
import {Slider} from '@miblanchard/react-native-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Touchable} from './Touchable';
import {
  addPlaylist,
  backward,
  forward,
  help,
  pauseButton,
  playButton,
} from '@/Assets/Images';
import {contentTime} from '@/utils/helper';
import moment from 'moment';
import {sendAudioCount} from '@/store/actions/content-action';
import useReduxStore from '@/hooks/useReduxStore';
import {playMusic} from '@/store/actions/music-action';
import {getValue} from '@/services/storage';

const Music = ({
  data,
  onIconOpen,
  addToPlaylist,
  isSeries,
  infoRef,
  navigation,
}) => {
  const {dispatch, getState} = useReduxStore();
  const {user} = getState('Auth');
  const {position, duration} = useProgress();
  const [play, setPlay] = useState(false);

  const setSound = async () => {
    try {
      const track = await TrackPlayer.getCurrentTrack();
      if (track !== null) {
        if (play) TrackPlayer.pause();
        else TrackPlayer.play();
        setPlay(!play);
      } else initiliazePlayer(true);
    } catch (error) {}
  };

  const initiliazePlayer = useCallback(async isStop => {
    try {
      // await TrackPlayer.setupPlayer();
      await TrackPlayer.add(data);

      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
        ],
      });
      if (isStop) {
        TrackPlayer.play();
        setPlay(true);
      }
    } catch (error) {
      console.log(error);
    }
  });

  const onSlide = async slide => {
    await TrackPlayer.seekTo(slide * duration);
  };

  const backwardAudio = () => {
    const isValidPosition = Boolean(
      position && position >= 30 && duration >= 30,
    );
    if (isValidPosition) TrackPlayer.seekTo(position - 30);
  };

  const forwardAudio = () => {
    if (duration > 30 && duration > position) TrackPlayer.seekTo(position + 30);
  };

  const closeAudio = () => {
    TrackPlayer.stop();
  };

  useEffect(() => {
    TrackPlayer.destroy();
    dispatch(playMusic({appMusic: false}));
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      closeAudio,
    );
    initiliazePlayer();
    return () => {
      TrackPlayer.destroy();
      dispatch(playMusic({appMusic: getValue('background') == 'true'}));
      backHandler.remove();
    };
  }, []);

  const onRefreshCount = () => {
    if (!addToPlaylist && !isSeries) {
      dispatch(
        sendAudioCount({
          id: data?.id,
          type: data?.type,
        }),
      );
    }
    console.log('onRefreshCount');
  };

  useTrackPlayerEvents(
    [
      Event.PlaybackQueueEnded,
      Event.RemotePause,
      Event.RemotePlay,
      Event.RemoteStop,
    ],
    async event => {
      const {type} = event;
      if (type == Event.PlaybackQueueEnded) {
        TrackPlayer.seekTo(0);
        setSound();
        onRefreshCount();
        if (user?.onboard_pass == 'false' && !user?.is_subscribed)
          navigation.replace('Subscription');
      }
      if (type == Event.RemotePause || type == Event.RemotePlay) setPlay(!play);
      if (type == Event.RemoteStop) setPlay(false);
    },
  );

  // useEffect(() => {
  //   if (play && Math.floor(position) < 1) onRefreshCount();
  // }, [position]);
  const currentAudioposition = position / duration;
  return (
    <View style={styles.listContainer}>
      <View>
        <View style={styles.card}>
          <Text style={styles.name} numberOfLines={2}>
            {data?.name || data?.title}
          </Text>
          <Text style={styles.category} numberOfLines={1}>
            {data?.category?.name}
          </Text>
          <Text style={styles.category} numberOfLines={1}>
            {data?.type?.charAt(0)?.toUpperCase() + data?.type?.slice(1)}
          </Text>
          <Text style={styles.time}>{contentTime(duration)}</Text>
        </View>
        <Slider
          thumbStyle={styles.thumb}
          value={currentAudioposition}
          onSlidingComplete={onSlide}
          thumbTintColor={Colors.white}
          containerStyle={styles.slider}
          minimumTrackTintColor={Colors.white}
          maximumTrackTintColor={Colors.blurWhite1}
        />
        <View style={styles.rowEnd}>
          <Text style={styles.position}>{contentTime(position)}</Text>
          <Text style={styles.duration}>{contentTime(duration)}</Text>
        </View>
        <Text style={styles.description} numberOfLines={1}>
          {/* {data?.description} */}
        </Text>
        <View style={styles.row}>
          {/* <Text style={styles.date} numberOfLines={1}>
            Supernatural people
          </Text> */}
          <FontAwesome
            size={5}
            name="circle"
            color={Colors.white}
            style={{paddingHorizontal: 6}}
          />
          <Text style={[styles.date, {marginVertical: 20}]} numberOfLines={1}>
            {moment(data?.created_at).format('MMM DD, YYYY')}
          </Text>
        </View>
      </View>
      <View style={styles.controllers}>
        <Touchable
          style={styles.buttonSmall}
          onPress={() => infoRef.current.open()}
          Opacity={0.7}>
          <Image style={styles.cornerButton} source={help} />
        </Touchable>
        <View style={styles.center}>
          <Touchable
            Opacity={0.7}
            onPress={backwardAudio}
            style={styles.buttonMedium}>
            <Image style={styles.centerButton} source={backward} />
          </Touchable>
          <Touchable Opacity={0.7} style={styles.button} onPress={setSound}>
            <Image
              style={styles.playerButton}
              source={play ? pauseButton : playButton}
            />
          </Touchable>
          <Touchable
            Opacity={0.7}
            onPress={forwardAudio}
            style={styles.buttonMedium}>
            <Image style={styles.centerButton} source={forward} />
          </Touchable>
        </View>
        <Touchable
          disabled={Boolean(isSeries)}
          Opacity={0.7}
          style={styles.buttonSmall}
          onPress={!addToPlaylist && onIconOpen}>
          <Image
            style={[
              styles.cornerButton,
              {
                tintColor: addToPlaylist ? Colors.transparent : Colors.white,
                opacity: isSeries ? 0 : 1,
              },
            ]}
            source={addPlaylist}
          />
        </Touchable>
      </View>
    </View>
  );
};

export default React.memo(Music);

const styles = StyleSheet.create({
  listContainer: {
    // flex: 1,
    // height: '90%',
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
  description: {
    fontSize: 22,
    color: Colors.white,
    textAlign: 'center',
    paddingVertical: 15,
    fontFamily: FontFamily.medium,
  },
  date: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
  },
  controllers: {
    width: '100%',
    marginTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cornerButton: {
    width: 26.5,
    height: 17,
    resizeMode: 'contain',
    tintColor: Colors.blurWhite2,
  },
  center: {
    width: '60%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  centerButton: {
    width: 26.5,
    height: 26.5,
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
    // backgroundColor: Colors.blurBlack,
    backgroundColor: Colors.blurWhite1,
  },
  buttonMedium: {
    // width: 55,
    // height: 55,
    // borderRadius: 180,
    // alignItems: 'center',
    // resizeMode: 'contain',
    // justifyContent: 'center',
    // backgroundColor: Colors.blurBlack,
  },
  buttonSmall: {
    // width: 45,
    // height: 45,
    // borderRadius: 180,
    // alignItems: 'center',
    // resizeMode: 'contain',
    // justifyContent: 'center',
    // backgroundColor: Colors.blurBlack,
  },
  playerButton: {
    width: 26.5,
    height: 26.5,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  name: {
    fontSize: 36,
    paddingBottom: 10,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.light,
  },
  category: {
    fontSize: 22,
    paddingBottom: 10,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
  },
  time: {
    fontSize: 22,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
