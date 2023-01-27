import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import useReduxStore from '@/hooks/useReduxStore';
import {getAllBackgrounds} from '@/store/actions/content-action';

const useBackgroundSelect = (navigation, {params}) => {
  const {getState, dispatch} = useReduxStore();
  const [active, setActive] = useState(true);
  const {backgrounds} = getState('Content');
  const [marked, setMarked] = useState(params?.background);

  const backFunction = () => {
    navigation.navigate('Settings', {
      ...params,
      background: marked?.title == 'Default' ? '' : marked,
    });
    return true;
  };

  const onRefresh = () => dispatch(getAllBackgrounds());
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

    if (!backgrounds.length) onRefresh();

    return () => {
      backHandler.remove();
      gestureEnd();
    };
  }, [marked]);

  return {
    data: params,
    backgrounds: [
      ...backgrounds,
      {
        id: 9999,
        name: 'Background',
        hash_code: '',
        background_image: '',
        title: 'Default',
      },
    ],
    marked,
    setMarked: setMarkedHandler,
    backFunction,
    onRefresh,
    active,
    toggle,
  };
};

export default useBackgroundSelect;
