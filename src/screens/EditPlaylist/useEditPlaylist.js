import {useState} from 'react';
import Schemas from '@/utils/Validation';
import useFormHook from '@/hooks/useForm';
import useReduxStore from '@/hooks/useReduxStore';
import * as ImagePicker from 'react-native-image-picker';
import {mediaPermission} from '@/hooks/useMediaPermission';
import {editPlaylist} from '@/store/actions/content-action';

const useEditPlaylist = ({navigation: {goBack}, route}) => {
  const data = route.params;
  // console.log('PlaylistDetailsData', data);
  const {handleSubmit, errors, control} = useFormHook(Schemas.playlist);
  const {getState, dispatch} = useReduxStore();
  const {playlist} = getState('Content');

  const [image, setImage] = useState('');

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

  const onSubmit = dataName => {
    // console.log('dataName', dataName);
    dispatch(
      editPlaylist({
        id: data?.id,
        name: dataName?.name,
        image: image || data?.image,
      }),
    );
    goBack();
  };

  return {
    data,
    playlist,
    errors,
    control,
    goBack,
    onSubmit,
    handleSubmit,
    launchImageLibrarys,
  };
};

export default useEditPlaylist;
