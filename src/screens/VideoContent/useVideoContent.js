// import {useEffect} from 'react';
// import useReduxStore from '@/hooks/useReduxStore';
// import {sendAudioCount} from '@/store/actions/content-action';

import {useState} from 'react';

const useVideoContent = ({navigation, route}) => {
  const data = route.params;
  const [fullscreen, setFullScreen] = useState(false);
  const checkFullScreen = val => {
    setFullScreen(val);
  };
  // console.log('VideoContent', data);
  // const {dispatch} = useReduxStore();
  // const onRefreshCount = () =>
  //   dispatch(
  //     sendAudioCount({
  //       id: data?.id,
  //       type: 'video',
  //     }),
  //   );

  // useEffect(() => {
  //   onRefreshCount();
  // }, []);

  return {data, fullscreen, checkFullScreen};
};

export default useVideoContent;
