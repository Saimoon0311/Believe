import {useEffect} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import useFormHook from '@/hooks/useForm';
import {updatePassword} from '@/store/actions/auth-action';
import Schemas from '@/utils/Validation';

const UseNewPassword = ({navigation, route}) => {
  const goBack = () => navigation.goBack();
  const {handleSubmit, errors, reset, control} = useFormHook(
    Schemas.newPassword,
  );
  const {getState, dispatch} = useReduxStore();
  const {update, verifyToken: reset_token} = getState('Auth');
  const onSubmit = ({confirm_password, new_password}) => {
    dispatch(
      updatePassword({
        reset_token,
        new_password,
        ...route.params,
        confirm_password,
      }),
      // reset('', {
      //   keepValues: false,
      // }),
    );
  };

  useEffect(() => {
    const event = navigation.addListener('focus', () =>
      reset('', {keepValues: false}),
    );
    return event;
  }, []);

  useEffect(() => {
    if (update) navigation.replace('Update');
  }, [update]);

  return {errors, control, handleSubmit, goBack, onSubmit};
};

export default UseNewPassword;
