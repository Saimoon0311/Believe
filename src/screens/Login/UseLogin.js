import useReduxStore from '@/hooks/useReduxStore';
import {loginUser} from '@/store/actions/auth-action';
import {useEffect} from 'react';
import useFormHook from '../../hooks/useForm';
import Schemas from '../../utils/Validation';

const UseLogin = ({navigation}) => {
  const {dispatch} = useReduxStore();
  const {handleSubmit, errors, reset, control} = useFormHook(Schemas.logIn);
  // const onSubmit = data => {
  //   console.log('Login With', data);
  //   dispatch(loginUser(data));
  // };

  const onSubmit = data => {
    console.log('Login With', data);
    dispatch(loginUser(data));
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

  const navForget = () => navigation.navigate('Forget');
  const navRegister = () =>
    navigation.navigate('OnboardStack', {screen: 'SetGoals'});
  // const navRegister = () => navigation.navigate('Register');

  return {errors, control, handleSubmit, navForget, navRegister, onSubmit};
};

export default UseLogin;
