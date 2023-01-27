import {useEffect} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {forgotUser} from '@/store/actions/auth-action';
import useFormHook from '@/hooks/useForm';
import Schemas from '@/utils/Validation';

const UseForget = ({navigation}) => {
  const goBack = () => navigation.goBack();
  const {dispatch, getState} = useReduxStore();
  const {forgot} = getState('Auth');

  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.forgot,
  );

  const onSubmit = data => {
    dispatch(forgotUser(data));
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
    if (forgot) navigation.replace('Verification', getValues());
  }, [forgot]);

  return {errors, control, handleSubmit, goBack, onSubmit};
};

export default UseForget;
