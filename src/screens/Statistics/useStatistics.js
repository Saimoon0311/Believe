import API from '@/services/API';
import {shareStats} from '@/services/ShareStats';
import {useState, useEffect, useRef} from 'react';

/* Setting the initial state of the component. */
const initialState = {
  last_unlocked: {},
  longest_streak: '',
  total_minutes: '',
  total_sessions: '',
  record_streaks: [],
};

const useStatistics = (navigation, route) => {
  /* Setting the initial state of the component. */
  const [state, setState] = useState(initialState);
  /* Creating a reference to the viewShotRef. */
  const viewShotRef = useRef();

  /**
   * It makes a request to the server to get the user's stats, and if the request is successful, it sets
   * the state to the data returned from the server
   */
  const getStats = async () => {
    try {
      const {ok, data} = await API.get('/user-stats');
      if (ok) setState(data);
    } catch (error) {
      console.log('error', error);
    }
  };

  /* Calling the getStats function when the component is mounted. */
  useEffect(() => {
    const event = navigation.addListener('focus', getStats);
    return event;
  }, []);

  /* Returning an object with the state, getStats, viewShotRef, and onShareStats. */
  return {
    state,
    getStats,
    viewShotRef,
    onShareStats: () => shareStats(viewShotRef),
  };
};

export default useStatistics;
