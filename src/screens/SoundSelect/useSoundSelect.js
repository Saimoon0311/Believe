import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';

const useSoundSelect = (navigation, {params}) => {
  const {key} = params;
  const [active, setActive] = useState(true);
  const [marked, setMarked] = useState(params?.[key]);
  const backFunction = () => {
    navigation.navigate('Settings', {
      ...params,
      [key]: marked || params?.[key],
    });
    return true;
  };

  const toggle = () => setActive(prev => !prev);

  const setMarkedHandler = param => active && setMarked(param);

  useEffect(() => {
    const gestureEnd = navigation.addListener('gestureEnd', e =>
      backFunction(),
    );

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backFunction,
    );

    return () => {
      backHandler.remove();
      gestureEnd();
    };
  }, [marked]);

  return {
    data: params,
    marked,
    setMarked: setMarkedHandler,
    backFunction,
    active,
    toggle,
  };
};

export default useSoundSelect;
