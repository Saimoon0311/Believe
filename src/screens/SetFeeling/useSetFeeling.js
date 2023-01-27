import {useEffect, useState} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {getFeelings} from '@/store/actions/onboard-action';
import {Alert} from 'react-native';

const useSetFeeling = (navigation, {params}) => {
  const data = params;
  const {getState, dispatch} = useReduxStore();
  const {feelingData} = getState('OnBoard');
  const [feeling, setFeeling] = useState([]);
  const [names, setNames] = useState([]);
  const onRefresh = () => dispatch(getFeelings());

  const goNext = () => {
    if (feeling.length)
      navigation.navigate('SetGender', {...data, feeling, names});
    else Alert.alert('Select minimun one feeling');
  };

  const selectFeelings = item => {
    const newFeeling = [...feeling];
    const newNames = [...names];
    const index = newFeeling.indexOf(item?.id);
    if (index > -1) {
      newFeeling.splice(index, 1);
      newNames.splice(index, 1);
    } else {
      if (feeling.length <= 2) {
        newFeeling.push(item?.id);
        newNames.push(item.name);
      } else Alert.alert('Maximum feelings limit is three');
    }
    setFeeling(newFeeling);
    setNames(newNames);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return {
    feeling,
    feelingData,
    onRefresh,
    goNext,
    selectFeelings,
  };
};

export default useSetFeeling;
