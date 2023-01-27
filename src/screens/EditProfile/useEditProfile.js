import {useState} from 'react';
import Schemas from '@/utils/Validation';
import useFormHook from '@/hooks/useForm';
import useReduxStore from '@/hooks/useReduxStore';
import * as ImagePicker from 'react-native-image-picker';
import {mediaPermission} from '@/hooks/useMediaPermission';
import {updateProfile} from '@/store/actions/auth-action';
import moment from 'moment';

const useEditProfile = ({navigation, route}) => {
  const data = route.params;
  const {getState, dispatch} = useReduxStore();
  const {handleSubmit, errors, control} = useFormHook(Schemas.editProfile);
  const {user} = getState('Auth');
  const [marked, setMarked] = useState(user?.gender);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(user?.age || 'D.O.B');
  const [image, setImage] = useState('');
  // console.log('image', image);

  const stringType = Boolean(typeof date == 'string');
  const selectedDate = stringType ? date : moment(date).format('DD MMM YYYY');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setDate(date);
  };

  const launchImageLibrarys = async () => {
    try {
      const res = await mediaPermission();
      if (res) {
        const {assets, didCancel} = await ImagePicker.launchImageLibrary();
        if (!didCancel) setImage(assets[0]);
      }
    } catch (error) {
      console.log(error, 'launchImageLibrarys');
    }
  };

  const onSubmit = data => {
    dispatch(
      updateProfile({
        name: data?.name,
        gender: marked,
        age: selectedDate,
        profile_image: image || user?.profile_image,
      }),
    );
  };

  return {
    data,
    user,
    errors,
    control,
    selectedDate,
    isDatePickerVisible,
    marked,
    image,
    setMarked,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    launchImageLibrarys,
    handleSubmit,
    onSubmit,
  };
};

export default useEditProfile;
