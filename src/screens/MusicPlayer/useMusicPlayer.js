import {useEffect, useRef, useState} from 'react';
import useFormHook from '@/hooks/useForm';
import Schemas from '@/utils/Validation';
import useReduxStore from '@/hooks/useReduxStore';
import {
  addAudioPlaylist,
  createPlaylist,
  getPlaylist,
} from '@/store/actions/content-action';
import ContentService from '@/services/content-service';
import {showError, showSuccess} from '@/services/SnackBar';
import {Platform} from 'react-native';
import {store} from '@/store/store';
import {saveFiles} from '@/store/actions/files-action';
import cache from '@/utils/helper/cache';
import {cacheMedia, getCacheMedia} from '@/services/DownloadServices';

const useMusicPlayer = (navigation, {params}) => {
  const [data, setData] = useState(params);
  const [isDownload, setIsDownload] = useState(false);
  const [imageDownload, setImageDownload] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const {getState, dispatch} = useReduxStore();
  const PlatformIOS = Platform.OS == 'ios';
  const {favoriteContentData, playlistData} = getState('Content');
  const audioRef = useRef(null);
  const imageRef = useRef(null);

  const updateFavorite = async () => {
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
      console.log(error);
    }
  };

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
      showError('if you leave the screen your download will be canceled.');
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
    data,
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
  };
};

export default useMusicPlayer;
