// import {useState} from 'react';

// const useAudioContent = ({navigation, route}) => {
//   const data = route.params;
//   const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);

//   const hideLoader = () => setIsTrackPlayerInit(true);

//   // console.log('AudioContent', data);

//   return {data, isTrackPlayerInit, hideLoader};
// };

// export default useAudioContent;

import {useEffect, useRef, useState} from 'react';
import useFormHook from '@/hooks/useForm';
import Schemas from '@/utils/Validation';
import useReduxStore from '@/hooks/useReduxStore';
import {
  addAudioPlaylist,
  createPlaylist,
  getPlaylist,
} from '@/store/actions/content-action';
import * as ContentService from '@/services/content-service';
import {showSuccess} from '@/services/SnackBar';

const useAudioContent = ({navigation, route}) => {
  // const data = route.params;
  const [data, setData] = useState(route.params);
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const {getState, dispatch} = useReduxStore();
  const {favoriteContentData, playlistData} = getState('Content');
  // console.log('useAudioContent', data);

  const updateFavorite = async () => {
    try {
      const {ok, data: apiData} = await ContentService.toggleFavorite({
        type: data?.type,
        audio_id: data?.id,
      });
      if (ok) {
        showSuccess(apiData?.message);
        setData({...apiData.audios, fav: true});
        // console.log('apiData', apiData.audios);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const valuedata = {...data, artist: 'Victoria Gallagher'};
  const hideLoader = () => setIsTrackPlayerInit(true);
  // console.log('MusicPlayer', valuedata);

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

  return {
    data,
    valuedata,
    modalizeRef,
    playlistRef,
    addPlaylistRef,
    errors,
    control,
    isTrackPlayerInit,
    favoriteContentData,
    playlistData,
    onCancel,
    onIconOpen,
    onIconClose,
    onPlaylistOpen,
    onPlaylistClose,
    onAddOpen,
    onAddClose,
    hideLoader,
    onSubmit,
    handleSubmit,
    updateFavorite,
  };
};

export default useAudioContent;
