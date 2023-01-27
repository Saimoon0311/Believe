import {useEffect, useState} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {getTracks} from '@/store/actions/onboard-action';

const useSetGender = (navigation, {params}) => {
  const data = params;
  const {getState, dispatch} = useReduxStore();
  const {genderData} = getState('OnBoard');

  const onRefresh = () => dispatch(getTracks());

  const [gender, setGender] = useState('');

  const GoNext = () => navigation.navigate('SetAge', {...data, gender});

  const GoSkip = () => {
    navigation.navigate('SetAge', {...data, gender});
  };
  useEffect(() => {
    onRefresh();
  }, []);

  return {
    gender,
    genderData,
    setGender,
    GoNext,
    onRefresh,
    GoSkip,
  };
};

export default useSetGender;
