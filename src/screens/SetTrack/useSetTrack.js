import {useEffect, useState} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {getTracks} from '@/store/actions/onboard-action';

const useSetTrack = ({navigation, route}) => {
  const data = route.params;
  // console.log('useSetTrack', data);

  const {getState, dispatch} = useReduxStore();
  const {trackData} = getState('OnBoard');

  const onRefresh = () => dispatch(getTracks());

  const [track, setTrack] = useState({
    name: '',
  });

  const goNext = () =>
    track.name != '' && navigation.navigate('SetGender', {...data, track});

  useEffect(() => {
    onRefresh();
  }, []);

  return {
    track,
    trackData,
    onRefresh,
    setTrack,
    goNext,
  };
};

export default useSetTrack;
