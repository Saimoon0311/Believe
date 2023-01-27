import {useEffect, useState} from 'react';
import useFormHook from '@/hooks/useForm';
import useReduxStore from '@/hooks/useReduxStore';
import {forgotUser, verifyCode} from '@/store/actions/auth-action';
import Schemas from '@/utils/Validation';

const UseVerification = ({navigation, route}) => {
  const [timer, setTimer] = useState(60);

  const getTime = t => {
    const digit = n => (n < 10 ? `0${n}` : `${n}`);
    const sec = digit(Math.floor(t % 60));
    const min = digit(Math.floor((t / 60) % 60));
    return min + ':' + sec;
  };

  const {dispatch, getState} = useReduxStore();
  const {verification} = getState('Auth');
  const {handleSubmit, errors, reset, control} = useFormHook(
    Schemas.verification,
  );

  const onSubmit = data => {
    dispatch(verifyCode({...data, ...route.params}));
    // reset('', {
    //   keepValues: false,
    // });
  };

  const resendCode = () => {
    setTimer(120);
    dispatch(forgotUser(route.params));
  };

  const {email} = route.params;

  useEffect(() => {
    const event = navigation.addListener('focus', () =>
      reset('', {keepValues: false}),
    );
    return event;
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (verification) navigation.replace('NewPassword', route.params);
  }, [verification]);

  return {
    email,
    timer,
    errors,
    control,
    getTime,
    handleSubmit,
    resendCode,
    onSubmit,
  };
};

export default UseVerification;
