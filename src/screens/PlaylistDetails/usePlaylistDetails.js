import {Alert, BackHandler} from 'react-native';
import {useEffect, useState, useCallback} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {
  deleteFullPlaylist,
  getPlaylistAudio,
  removeAudioPlaylist,
  sendAudioCount,
  updatePlayListAudios,
} from '@/store/actions/content-action';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
const menuData = [
  {
    id: 1,
    name: 'Edit Playlist',
  },
  {
    id: 2,
    name: 'Delete Playlist',
  },
  {
    id: 3,
    name: 'Add Tracks',
  },
];

const initialState = {audio_id: 0, type: ''};

const usePlaylistDetails = ({navigate, goBack, addListener}, {params}) => {
  const data = params;

  const [contentID, setContentID] = useState(initialState);
  const [playerState, setPlayerState] = useState('none');
  const [visible, setVisible] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [loop, setloop] = useState(false);
  const {getState, dispatch} = useReduxStore();
  const {position} = useProgress();

  const isPlaying = Boolean(playerState == 'playing' || playerState == 3);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const hideDelete = () => setContentID(initialState);
  const onRefresh = () => dispatch(getPlaylistAudio({id: data?.id}));
  const {playlistAudios, playlist} = getState('Content');

  const showDelete = ({id: audio_id, type}) => setContentID({audio_id, type});

  const onSelect = () => {
    const param = {playlist_id: data?.id, ...contentID};
    dispatch(removeAudioPlaylist(param));
    hideDelete();
  };

  const editPlaylist = () => {
    hideMenu();
    navigate('EditPlaylist', data);
  };

  const onDelete = () => {
    dispatch(deleteFullPlaylist({id: data?.id}));
    goBack();
  };
  const onSort = () => {
    hideMenu();
    navigate('SortPlaylist', {audio: playlistAudios, playlist_id: data.id});
  };

  const deletePlaylist = () => {
    hideMenu();
    Alert.alert(
      'Delete Playlist',
      'Are you sure you want to delete it.',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: onDelete,
          style: 'Confirm',
        },
      ],
      {cancelable: true},
    );
    // navigation.navigate('EditPlaylist', data);
  };

  const playAudio = index => {
    navigate('MusicPlayer', {data: playlistAudios, index});
  };

  const runOnLoop = async () => {
    try {
      if (loop) await TrackPlayer.setRepeatMode(RepeatMode.Off);
      else await TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setloop(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSortArray = ({data: playlistAudios}) => {
    dispatch(updatePlayListAudios({playlistAudios, playlist}));
  };

  const goAudioBack = () => {
    goBack();
  };

  // useEffect(() => {
  //   const gestureEnd = addListener('gestureEnd', closeAudio);
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     closeAudio,
  //   );
  //   return () => {
  //     backHandler.remove();
  //     gestureEnd();
  //   };
  // }, []);

  useEffect(() => {
    const event = addListener('focus', onRefresh);
    return event;
  }, [playlistAudios]);

  return {
    data,
    playlist,
    visible,
    menuData,
    playlistAudios,
    contentID,
    isPlaying,
    loop,
    trackIndex,
    position,
    hideMenu,
    hideDelete,
    showMenu,
    showDelete,
    onSelect,
    editPlaylist,
    deletePlaylist,
    playAudio,
    onRefresh,
    goAudioBack,
    runOnLoop,
    updateSortArray,
    onSort,
  };
};

export default usePlaylistDetails;
