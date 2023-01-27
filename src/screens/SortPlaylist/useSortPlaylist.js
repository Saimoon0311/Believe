import {Alert, BackHandler} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {
  deleteFullPlaylist,
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
import {useFocusEffect} from '@react-navigation/native';
import API from '@/services/API';
import {showError, showSuccess} from '@/services/SnackBar';
// TrackPlayer.setupPlayer()
//   .then(() => console.log('setupPlayer success'))
//   .catch(() => console.log('setupPlayer error'));

const initialState = {audio_id: 0, type: ''};

const useSortPlaylist = ({navigate, goBack, addListener}, {params}) => {
  // const data = params;
  const {playlist_id, audio} = params;
  const [contentID, setContentID] = useState(initialState);
  const [playerState, setPlayerState] = useState('none');
  const [data, setData] = useState([...audio]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [loop, setloop] = useState(false);
  const {getState, dispatch} = useReduxStore();
  const {playlistAudios, playlist} = getState('Content');
  const [saveSort, setSaveSort] = useState(false);

  const isPlaying = Boolean(playerState == 'playing' || playerState == 3);

  const hideDelete = () => setContentID(initialState);
  // const onRefresh = () => dispatch(getPlaylistAudio({id: data?.id}));

  const showDelete = ({id: audio_id, type}) => setContentID({audio_id, type});

  const onSelect = () => {
    const param = {playlist_id: data?.id, ...contentID};
    // dispatch(removeAudioPlaylist(param));
    hideDelete();
  };

  const updateSortArray = ({data}) => {
    setSaveSort(true);
    setData(data);
    // dispatch(updatePlayListAudios({playlistAudios, playlist}));
  };

  const updateArry = async () => {
    const {ok, originalError} = await API.post('/drag-playlist-audios', {
      playlist_id,
      data,
    });
    if (ok) {
      showSuccess('Playlist successfully updated');
      setSaveSort(false);
      goBack();
    } else showError(originalError);
  };

  const showAlert = () => {
    Alert.alert('Are you sure you want to exit?', 'Your changes will be lost', [
      {
        text: 'Exit',
        onPress: () => goBack(),
        style: 'cancel',
      },
      {text: 'Stay'},
    ]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (saveSort) {
          showAlert();
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [saveSort]),
  );
  return {
    data,
    playlistAudios: data,
    contentID,
    isPlaying,
    trackIndex,
    position: '',
    hideDelete,
    showDelete,
    onSelect,
    onRefresh: () => {},
    updateSortArray,
    saveSort,
    updateArry,
  };
};

export default useSortPlaylist;
