import {useEffect, useRef} from 'react';
import Schemas from '@/utils/Validation';
import useFormHook from '@/hooks/useForm';
import useReduxStore from '@/hooks/useReduxStore';
import {createPlaylist, getPlaylist} from '@/store/actions/content-action';

const useLibrary = ({navigation: {navigate, addListener}}) => {
  /* A custom hook that returns the state and dispatch from the redux store. */
  const {handleSubmit, reset, errors, control} = useFormHook(Schemas.playlist);
  /* A custom hook that returns the state and dispatch from the redux store. */
  const {getState, dispatch} = useReduxStore();
  /* Destructuring the playlistData from the Content reducer. */
  const {playlistData} = getState('Content');
  /* Creating a reference to the modalize component. */
  const modalizeRef = useRef(null);
  /**
   * It takes a parameter called params, and then navigates to the PlaylistDetails screen, passing in the
   * params
   */
  const libraryDetail = params => navigate('PlaylistDetails', params);

  /**
   * OnSubmit is a function that takes in data, dispatches the createPlaylist action, resets the form,
   * and closes the modal
   */
  const onSubmit = data => {
    dispatch(createPlaylist(data));
    reset('', {
      keepValues: false,
    });
    onClose();
  };

  /**
   * It opens the modal.
   */
  const onOpen = () => modalizeRef.current?.open();
  /**
   * It closes the modal.
   */
  const onClose = () => modalizeRef.current?.close();

  /**
   * It takes the dispatch function as an argument and returns a function that dispatches the
   * getPlaylist action creator
   */
  const onRefresh = () => dispatch(getPlaylist());

  /* Listening for the focus event, and when it occurs, it calls the onRefresh function. */
  useEffect(() => {
    const event = addListener('focus', onRefresh);
    return event;
  }, []);

  /* Returning an object with all the variables and functions that are used in the Library screen. */
  return {
    errors,
    control,
    modalizeRef,
    playlistData,
    onRefresh,
    onSubmit,
    onOpen,
    onClose,
    libraryDetail,
    handleSubmit,
  };
};

export default useLibrary;
