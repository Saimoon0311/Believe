import useReduxStore from '@/hooks/useReduxStore';
import {deleteAllFiles, deleteFiles} from '@/services/DownloadServices';
import {showError, showSuccess} from '@/services/SnackBar';
import cache from '@/utils/helper/cache';
import {useEffect} from 'react';
import {useState} from 'react';
import {Alert} from 'react-native';

const useDownloads = ({navigation, route}) => {
  const [downloads, setDownloads] = useState([]);
  const {getState, dispatch} = useReduxStore();

  const {user} = getState('Auth');

  const playAudio = params =>
    navigation.navigate('MusicPlayer', {...params, isSeries: true});

  const onRowOpen = (rowKey, rowMap) => {
    setTimeout(() => {
      rowMap[rowKey]?.closeRow();
    }, 2000);
  };

  const [audioPath, setAudioPath] = useState([]);
  const [imagePath, setImagePath] = useState([]);

  const showAlert = () => {
    Alert.alert(
      'Clear Downloads',
      'Are you sure you want to delete all downloaded content?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteDownloads()},
      ],
    );
  };

  const deleteDownloads = async type => {
    try {
      const downloadFiles = cache.get('downloadedFiles');
      if (downloadFiles != null && downloadFiles.length > 0) {
        await downloadFiles.map(res => {
          imagePath.push(res.cover_image || res.image);
        });
        await downloadFiles.map(res => {
          audioPath.push(res.path);
        });
        await deleteAllFiles(imagePath);
        await deleteAllFiles(audioPath);
        cache.store('downloadedFiles', []);
        setDownloads([]);
        !type && showSuccess('All download file has been deleted');
      } else !type && showError('No downloads found!');
    } catch (error) {
      console.log('25', error);
    }
  };

  const deleteFilesFunc = async (data, index) => {
    try {
      await deleteFiles(downloads[index].cover_image || downloads[index].image);
      await deleteFiles(downloads[index].path);
      await cache.store(
        'downloadedFiles',
        downloads.filter(res => res.id != downloads[index].id),
      );
      const filterFiles = (await cache.get('downloadedFiles')) || [];
      setDownloads(filterFiles);
      showSuccess('File Deleted Successfuly');
    } catch (error) {}
  };
  useEffect(() => {
    const downloads = cache.get('downloadedFiles') || [];
    setDownloads(downloads);
    const event = navigation.addListener('focus', () => {
      const downloads = cache.get('downloadedFiles') || [];
      setDownloads(downloads);
      // deleteFilesFunc();
    });
    return event;
  }, []);

  return {
    data: downloads,
    onPress: playAudio,
    playAudio,
    deleteFilesFunc,
    onRowOpen,
    deleteAllDownloads: showAlert,
  };
};

export default useDownloads;
