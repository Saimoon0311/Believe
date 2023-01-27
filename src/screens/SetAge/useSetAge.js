import {useEffect, useState} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {getTracks} from '@/store/actions/onboard-action';

const useSetAge = (navigation, {params}) => {
  const data = params;

  const {getState, dispatch} = useReduxStore();
  const {ageData} = getState('OnBoard');

  const onRefresh = () => dispatch(getTracks());

  const [age, setAge] = useState({
    name: '',
  });

  const GoSkip = () => {
    navigation.navigate('ContentLoading', {...data, age});
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return {
    age,
    ageData,
    setAge,
    GoNext: GoSkip,
    GoSkip,
    onRefresh,
  };
};

export default useSetAge;
