import ContentService from '@/services/content-service';
import {useEffect, useState} from 'react';

/* A custom hook that takes in two parameters, navigate and params. */
const useViewAll = ({navigate}, {params}) => {
  const [audios, setAudios] = useState([]);

  console.log('params', params);
  /**
   * It takes a parameter called params, and then navigates to the LibraryDetails screen, passing in
   * the params
   */
  const libraryDetail = params => navigate('LibraryDetails', params);
  /**
   * It takes in a parameter, and then navigates to the MusicPlayer screen, passing in the parameter
   */
  const playAudio = params => navigate('MusicPlayer', params);

  /**
   * It fetches all audios from the server and sets the state
   */
  const getAllAudios = async () => {
    try {
      const {ok, data} = await ContentService.allNewLibraries(
        params?.requestParam,
      );
      if (ok) setAudios(data?.audios);
    } catch (error) {}
  };

  /**
   * It calls the getAllAudios function.
   */
  const onRefresh = () => getAllAudios();

  /* Calling the onRefresh function. */
  useEffect(() => {
    onRefresh();
  }, []);

  /* Returning the data, audios, libraryDetail, playAudio, and onRefresh functions. */
  return {
    data: params,
    audios,
    libraryDetail,
    playAudio,
    onRefresh,
    title: params?.title,
  };
};

export default useViewAll;
