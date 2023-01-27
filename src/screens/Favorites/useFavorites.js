import {useEffect} from 'react';
import {favoriteData} from '@/store/actions/content-action';
import useReduxStore from '@/hooks/useReduxStore';
import {toggleFavorite} from '@/store/actions/content-action';

const useFavorites = (navigation, {params}) => {
  /* A custom hook that returns the state and dispatch from the redux store. */
  const {getState, dispatch} = useReduxStore();
  /* Destructuring the allFavorites from the Content state. */
  const {allFavorites} = getState('Content');
  /* Destructuring the params object. */
  const data = params;

  /**
   * It navigates to the MusicPlayer screen and passes the params object as well as the fav boolean
   */
  const playAudio = params => navigation.navigate('MusicPlayer', params);

  /**
   * It removes the favorite from the list.
   */
  const onRemove = toggleData => {
    dispatch(
      toggleFavorite({type: toggleData?.type, audio_id: toggleData?.id}),
    );
  };

  /**
   * It's a function that takes in a dispatch function as an argument and returns a function that
   * dispatches the favoriteData action
   */
  const onRefresh = () => dispatch(favoriteData());

  /* It's a function that takes in a dispatch function as an argument and returns a function that
 dispatches the favoriteData action */
  useEffect(() => {
    const event = navigation.addListener('focus', () => onRefresh());
    return event;
  }, [allFavorites]);

  /* It's returning the data, allFavorites, onRefresh, playAudio, onRemove variables. */
  return {data, allFavorites, onRefresh, playAudio, onRemove};
};

export default useFavorites;
