import {useEffect, useState} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {getGoals} from '@/store/actions/onboard-action';
import {Alert} from 'react-native';

const useSetGoals = (navigation, {params}) => {
  const data = params;
  const {getState, dispatch} = useReduxStore();
  const {goalData} = getState('OnBoard');

  const onRefresh = () => dispatch(getGoals());

  const [goals, setGoals] = useState([]);
  const [goalsName, setGoalsNames] = useState([]);
  const GoNext = () => {
    if (goals.length) navigation.navigate('SetFeeling', {goals, goalsName});
    // navigation.navigate('SetFeeling', {...data, goals, goalsName});
    else Alert.alert('Select minimun one goal');
  };

  const selectGoals = item => {
    const newGoals = [...goals];
    const newGoalsName = [...goalsName];
    const index = newGoals.indexOf(item?.id);
    if (index > -1) {
      newGoals.splice(index, 1);
      newGoalsName.splice(index, 1);
    } else {
      if (newGoals.length <= 2) {
        newGoals.push(item?.id);
        newGoalsName.push(item.name);
      } else Alert.alert('Maximum goals limit is three');
    }
    setGoals(newGoals);
    setGoalsNames(newGoalsName);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return {
    goals,
    goalData,
    GoNext,
    onRefresh,
    selectGoals,
  };
};

export default useSetGoals;
