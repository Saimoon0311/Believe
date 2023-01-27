import {getTimerTokem, setTimerToken, hasKey} from '@/services/storage';
import {bellsData} from '@/utils/helper/LocalDb';
import {useEffect} from 'react';

const timer = [
  {
    id: 1,
    name: 'Meditation',
    title: 'Select',
    time: true,
  },
  {
    id: 2,
    name: 'Warp Up',
    title: 'Select',
    time: true,
  },
  {
    id: 3,
    name: 'Intervals',
    title: 'Select',
    time: true,
  },
];

const backgroundData = {
  id: 9999,
  name: 'Background',
  hash_code: '',
  background_image: '',
  title: 'Default',
};

const tracksData = [
  {
    id: 1,
    disabled: false,
    name: 'Starting Bell',
    artist: 'Victoria Gallagher',
    title: 'Select',
    url: '',
    artwork: '',
  },
  {
    id: 2,
    disabled: false,
    name: 'Ending Bell',
    artist: 'Victoria Gallagher',
    title: 'Select',
    url: '',
    artwork: '',
  },
  {
    id: 3,
    disabled: false,
    name: 'Intervals Bell',
    artist: 'Victoria Gallagher',
    title: 'Select',
    url: '',
    artwork: '',
  },
];

const useSettings = ({navigate}, {params}) => {
  const hasTimer = hasKey('timer');
  const saveTimerVal = hasTimer && getTimerTokem('timer');
  const data = hasTimer && !params?.meditation ? saveTimerVal : params;
  const meditateData = {
    meditation: data?.meditation || 300,
    startBell: data?.startBell || bellsData[4],
    endBell: data?.endBell || bellsData[1],
    background: data?.background || backgroundData,
  };

  const onSessionStart = () => navigate('SessionTimer', meditateData);
  const onBackgroundSelect = () => navigate('BackgroundSelect', meditateData);

  const daynamicRoute = (route, key, header) =>
    navigate(route, {...meditateData, key, header});

  useEffect(() => {
    setTimerToken('timer', params);
  }, [params]);

  return {
    data,
    timer,
    tracksData,
    meditateData,
    backgroundData,
    daynamicRoute,
    onSessionStart,
    onBackgroundSelect,
  };
};

export default useSettings;
