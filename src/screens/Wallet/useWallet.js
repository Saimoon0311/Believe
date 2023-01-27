import {useRef} from 'react';
import useReduxStore from '@/hooks/useReduxStore';

const useWallet = ({navigation, route}) => {
  const data = route.params;
  const {getState} = useReduxStore();
  const {user} = getState('Auth');

  const modalizeRef = useRef(null);
  const onOpen = () => modalizeRef.current?.open();
  const onClose = () => modalizeRef.current?.close();
  // console.log('data', data);

  return {user, data, modalizeRef, onOpen, onClose};
};

export default useWallet;
