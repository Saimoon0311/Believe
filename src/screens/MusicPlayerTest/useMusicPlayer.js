import {useEffect, useRef, useState} from 'react';
import useFormHook from '@/hooks/useForm';
import Schemas from '@/utils/Validation';
import useReduxStore from '@/hooks/useReduxStore';
import {
  addAudioPlaylist,
  createPlaylist,
  getPlaylist,
  sendAudioCount,
} from '@/store/actions/content-action';
import ContentService from '@/services/content-service';
import {showSuccess} from '@/services/SnackBar';
import {Alert, BackHandler, Platform} from 'react-native';
import {store} from '@/store/store';
import {saveFiles} from '@/store/actions/files-action';
import cache from '@/utils/helper/cache';
import {cacheMedia, getCacheMedia} from '@/services/DownloadServices';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  useProgress,
  Capability,
} from 'react-native-track-player';
import {useCallback} from 'react';
import {playMusic} from '@/store/actions/music-action';
import {getValue} from '@/services/storage';

const useMusicPlayer = (navigation, {params}) => {
  const {getState, dispatch} = useReduxStore();
  const {user} = getState('Auth');
  const checkParamsType = Array.isArray(params.data);
  const isSubscribed = Boolean(user?.is_subscribed);
  const allData = checkParamsType ? params.data : [];
  const getLength = allData.length;
  const [index, setIndex] = useState(checkParamsType ? params.index : 0);
  const [getParamsData, setGetParamsData] = useState(
    checkParamsType ? allData[index] : params,
  );
  const [data, setData] = useState(getParamsData);
  const [isDownload, setIsDownload] = useState(false);
  const [imageDownload, setImageDownload] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [seekValue, setSeekValue] = useState(0);
  const [hitFirst, setHitFirst] = useState(false);
  const PlatformIOS = Platform.OS == 'ios';
  const {favoriteContentData, playlistData} = getState('Content');
  const audioRef = useRef(null);
  const imageRef = useRef(null);
  const [loop, setloop] = useState(false);
  const isPlayAble = Boolean(getLength > 0);
  const [hitControlFirst, setHitControlsFirst] = useState(false);

  const updateFavorite = async () => {
    console.log('data', data?.id);
    try {
      const {ok, data: apiData} = await ContentService.toggleFavorite({
        type: data?.type,
        audio_id: data?.id,
      });
      if (ok) {
        showSuccess(apiData?.message);
        setData(apiData.audios);
      }
    } catch (error) {
      console.log('sefsdf', error);
    }
  };

  const alertMessage = (title, message, onConfirm, onCancel) => {
    Alert.alert(title, message, [
      {
        text: 'Cancel',
        onPress: onCancel,
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: onConfirm,
      },
    ]);
  };

  // MUSIC ALL FUNCTION

  const {position, duration} = useProgress();
  const [play, setPlay] = useState(false);

  const setSound = async () => {
    try {
      const track = await TrackPlayer.getCurrentTrack();
      if (track !== null) {
        if (play) TrackPlayer.pause();
        else {
          TrackPlayer.play();
          if (!hitFirst) {
            hitOnStart();
            setHitFirst(true);
          }
        }
        setPlay(!play);
      } else initiliazePlayer(true);
    } catch (error) {}
  };

  const initiliazePlayer = useCallback(async isStop => {
    try {
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

  const hitOnStart = () => {
    console.log('First Hit');
  };

  const onSlide = async slide => {
    if (isSubscribed) {
      if (!hitControlFirst) {
        alertMessage(
          'Warning',
          'Your 10 points will minus?',
          async () => {
            await TrackPlayer.seekTo(slide * duration);
            setHitControlsFirst(true);
          },
          async () => {
            console.log('cancel');
          },
        );
      } else await TrackPlayer.seekTo(slide * duration);
      // Alert.alert('Your 10 points is minus');
    } else {
      Alert.alert('Your can not change audio');
    }
  };

  const backwardAudio = () => {
    const isValidPosition = Boolean(
      position && position >= 30 && duration >= 30,
    );
    if (isValidPosition && !hitControlFirst) {
      alertMessage(
        'Warning',
        'Your 10 points will minus?',
        () => {
          TrackPlayer.seekTo(position - 30);
          setHitControlsFirst(true);
        },
        () => {},
      );
    } else if (isValidPosition && hitControlFirst)
      TrackPlayer.seekTo(position - 30);
  };

  const forwardAudio = () => {
    if (duration > 30 && duration > position && !hitControlFirst) {
      alertMessage(
        'Warning',
        'Your 10 points will minus?',
        () => {
          TrackPlayer.seekTo(position + 30);
          setHitControlsFirst(true);
        },
        () => {},
      );
    } else if (duration > 30 && duration > position && hitControlFirst)
      TrackPlayer.seekTo(position + 30);
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
    // if (!addToPlaylist && !isSeries) {
    // }
    dispatch(
      sendAudioCount({
        id: data?.id,
        type: data?.type || 'series',
      }),
    );
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
        loop && nextAudio(index);
        if (user?.onboard_pass == 'false' && !user?.is_subscribed)
          navigation.replace('Subscription');
      }
      if (type == Event.RemotePause || type == Event.RemotePlay) setPlay(!play);
      if (type == Event.RemoteStop) setPlay(false);
    },
  );

  const currentAudioposition = position / duration;

  //  Cancel download

  const cancelDownloadFun = () => {
    audioRef.current?.cancel(err => console.log('audio', err));
    imageRef.current?.cancel(err => console.log('audio', err));
  };

  // Request Playlist Modal
  const modalizeRef = useRef(null);
  const onIconOpen = () => modalizeRef.current?.open();
  const onIconClose = () => modalizeRef.current?.close();

  //List of Playlist Modal
  const playlistRef = useRef(null);
  const onPlaylistOpen = () => {
    onIconClose();
    playlistRef.current?.open();
  };
  const onPlaylistClose = listData => {
    playlistRef.current?.close();
    dispatch(
      addAudioPlaylist({
        type: data?.type,
        audio_id: data?.id,
        playlist_id: listData?.id,
      }),
    );
  };

  // for start dwonload

  const startDownload = async () => {
    try {
      const downloadedFiles = cache.get('downloadedFiles');
      const isFile = Boolean(
        downloadedFiles.length &&
          downloadedFiles.find(res => (res.id == data?.id ? true : false)),
      );
      if (isFile) return showSuccess('Media is already exists in downloads');
      setImageDownload(true);
      // showError('if you leave the screen your download will be canceled.');
      imageRef.current = cacheMedia(data?.path, () => {});
      audioRef.current = cacheMedia(data?.cover_image || data?.image, () => {});

      await imageRef.current.result;
      await audioRef.current.result;

      const audioFile = await getCacheMedia(data?.path);
      const coverImage = await getCacheMedia(data?.cover_image || data?.image);

      const downloadMedia = {
        ...data,
        cover_image: PlatformIOS
          ? coverImage.path
          : 'file://' + coverImage.path,
        path: PlatformIOS ? audioFile.path : 'file://' + audioFile.path,
        url: PlatformIOS ? audioFile.path : 'file://' + audioFile.path,
      };
      store.dispatch(saveFiles(downloadMedia));
      setIsCompleted(true);
      showSuccess('Your download has been completed');
    } catch (error) {
      console.log('error download', error);
    } finally {
      setImageDownload(false);
      setTimeout(() => {
        setIsDownload(false);
        setIsCompleted(false);
      }, 2000);
    }
  };

  // prevous audio     Next Audio

  const previousAudio = i => {
    if (i > 0) {
      setPlay(false);
      TrackPlayer.destroy();
      closeAudio();
      initiliazePlayer();
      setIndex(prev => prev - 1);
      setGetParamsData(() => allData[i - 1]);
      setData(() => allData[i - 1]);
    }
  };
  const nextAudio = i => {
    if (i < getLength - 1) {
      setPlay(false);
      TrackPlayer.destroy();
      closeAudio();
      initiliazePlayer();
      setIndex(prev => prev + 1);
      setGetParamsData(() => allData[i + 1]);
      setData(() => allData[i + 1]);
    } else {
      setPlay(false);
      TrackPlayer.destroy();
      closeAudio();
      initiliazePlayer();
      setIndex(0);
      setGetParamsData(() => allData[0]);
      setData(() => allData[0]);
    }
  };

  const runOnLoop = async () => {
    setloop(prev => !prev);
  };

  //List of Playlist Modal
  const addPlaylistRef = useRef(null);
  const onAddOpen = () => {
    playlistRef.current?.close();
    addPlaylistRef.current?.open();
  };
  const onAddClose = () => addPlaylistRef.current?.close();
  const onCancel = () => {
    addPlaylistRef.current?.close();
    playlistRef.current?.open();
  };

  // Form Submit Modal
  const {handleSubmit, reset, errors, control} = useFormHook(Schemas.playlist);
  const onSubmit = dataSet => {
    dispatch(
      createPlaylist({...dataSet, type: data?.type, audio_id: data?.id}),
    );
    reset('', {
      keepValues: false,
    });
    onAddClose();
  };

  // Playlist Data
  const onRefresh = () => dispatch(getPlaylist());

  useEffect(() => {
    const event = navigation.addListener('focus', () => onRefresh());
    return event;
  }, [playlistData]);

  useEffect(() => {
    return cancelDownloadFun;
  }, []);

  return {
    data: getParamsData,
    valuedata: data,
    modalizeRef,
    playlistRef,
    addPlaylistRef,
    errors,
    control,
    favoriteContentData,
    playlistData,
    onCancel,
    onIconOpen,
    onIconClose,
    onPlaylistOpen,
    onPlaylistClose,
    onAddOpen,
    onAddClose,
    onSubmit,
    handleSubmit,
    updateFavorite,
    startDownload,
    isDownload,
    isCompleted,
    progressVlaue: 0,
    cancelDownloadFun: () => {},
    imageDownload,
    onSlide,
    backwardAudio,
    forwardAudio,
    position,
    duration,
    currentAudioposition,
    setSound,
    play,
    checkParamsType,
    index,
    previousAudio,
    nextAudio,
    isSubscribed,
    runOnLoop,
    loop,
    isPlayAble,
  };
};

export default useMusicPlayer;
