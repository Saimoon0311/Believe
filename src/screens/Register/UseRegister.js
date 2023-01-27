import {useEffect} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {signUpUser} from '@/store/actions/auth-action';
import useFormHook from '@/hooks/useForm';
import Schemas from '@/utils/Validation';

const UseRegister = (navigation, {params}) => {
  const navLogin = () => navigation.navigate('Login');
  const {dispatch, getState} = useReduxStore();
  const {isRegister} = getState('Auth');
  const {handleSubmit, errors, reset, control} = useFormHook(Schemas.signUp);
  const onSubmit = data => {
    console.log('SignUp With', data);
    dispatch(signUpUser({...data, params}));
    // reset('', {
    //   keepValues: false,
    // });
  };

  useEffect(() => {
    const event = navigation.addListener('focus', () =>
      reset('', {keepValues: false}),
    );
    return event;
  }, []);

  useEffect(() => {
    if (isRegister) navLogin();
  }, [isRegister]);

  return {errors, control, handleSubmit, onSubmit, navLogin};
};

export default UseRegister;
