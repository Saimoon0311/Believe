import {secondsToTime} from '@/utils/helper';
import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';

const useSessionSelect = (navigation, {params}) => {
  const data = params;
  const [duration, setDuration] = useState(
    data[data?.key]
      ? secondsToTime(Number(data[data?.key]))
      : {seconds: 0, minutes: 0, hours: 0},
  );

  const {seconds} = duration;
  const minutes = duration.minutes * 60;
  const hours = duration.hours * 3600;

  const totalTime = Number(seconds) + Number(minutes) + Number(hours);

  const isGrater = data?.key == 'intervals' && totalTime >= data?.meditation;

  const backFunction = () => {
    navigation.navigate('Settings', {
      ...params,
      [data?.key]: isGrater ? 0 : totalTime,
    });
    return true;
  };

  useEffect(() => {
    const gestureEnd = navigation.addListener('gestureEnd', backFunction);
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backFunction,
    );
    return () => {
      backHandler.remove();
      gestureEnd();
    };
  }, [duration]);

  return {data, setDuration, backFunction, duration, isGrater};
};

export default useSessionSelect;
