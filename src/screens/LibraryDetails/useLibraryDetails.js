import {useEffect, useState} from 'react';
import API from '@/services/API';

const useLibraryDetails = (navigation, {params}) => {
  const [audios, setAudios] = useState([]);
  const libraryDetail = params => navigation.navigate('MusicPlayer', params);
  const onRefresh = async _ => {
    try {
      const {data, ok} = await API.get(
        `/${params?.requestParam}=${params?.id}`,
      );
      if (ok) {
        const {audios} = data || {};
        setAudios(audios);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const event = navigation.addListener('focus', onRefresh);
    return event;
  }, []);

  return {data: params, allLibAudios: audios, libraryDetail, onRefresh};
};

export default useLibraryDetails;
