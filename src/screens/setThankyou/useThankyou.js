import {useEffect, useState} from 'react';
import useReduxStore from '@/hooks/useReduxStore';

const useSetThankyou = (navigation, {params}) => {
  const data = params;
  const [isExplore, setIsExplore] = useState(false);
  const {getState} = useReduxStore();
  const {user} = getState('Auth');
  console.log(':user', user);
  const GoNext = () => {
    if (user?.is_subscribed) navigation.replace('MainTabScreen');
    else {
      setIsExplore(true);
      navigation.navigate('Subscription');
    }
  };

  const onPlay = () =>
    navigation.navigate('MusicPlayer', {...data?.audio, isSeries: true});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      if (isExplore) navigation.replace('MainTabScreen');
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isExplore]);

  return {
    GoNext,
    onPlay,
    apidata: data,
    feelingData: data.names,
    goalingData: data.goalsName,
    user,
  };
};

export default useSetThankyou;
