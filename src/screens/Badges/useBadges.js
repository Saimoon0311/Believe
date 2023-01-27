import API from '@/services/API';
import cache from '@/utils/helper/cache';
import {useEffect, useState} from 'react';

/* A constant that is used to set the initial state of the component. */
const initialState = {all_badges: [], last_unlocked: {}};

const useBadges = (navigation, {params}) => {
  /* Getting the data from the cache. */
  const data = cache.get('/get-all-achievements');
  /* A hook that is used to manage the state of the component. */
  const [state, setState] = useState(data || initialState);

  /**
   * It makes a request to the API to get all the achievements and then sets the state with the data
   */
  const getBadges = async () => {
    try {
      const {ok, data} = await API.get('/get-all-achievements');
      if (ok) setState(data);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  /* A hook that is used to run a function when the component is mounted. */
  useEffect(() => {
    getBadges();
  }, []);

  /* Returning the state and the function that is used to get the badges. */
  return {state, getBadges};
};

export default useBadges;
