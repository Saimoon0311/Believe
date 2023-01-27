import useFormHook from '@/hooks/useForm';
import Schemas from '@/utils/Validation';

const useIntroduction = ({navigation}) => {
  const {handleSubmit, errors, control} = useFormHook(Schemas.username);

  const onSubmit = dataForm => {
    navigation.navigate('SetGoals', dataForm);
  };

  return {errors, control, onSubmit, handleSubmit};
};

export default useIntroduction;
