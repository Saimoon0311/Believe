import {useEffect, useState} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {getHomeScreenContent} from '@/store/actions/content-action';
import API from '@/services/API';

const useHome = ({navigate, addListener}) => {
  /* Destructuring the useReduxStore hook, and then destructuring the getState function, which is
returned from the useReduxStore hook. */
  const {getState, dispatch} = useReduxStore();
  const {user} = getState('Auth');
  const {homeContent} = getState('Content');
  const [reminders, setReminders] = useState([]);

  const isSubscript = Boolean(user?.is_subscribed);

  /**
   * It takes in a parameter called params, and then navigates to the ViewAll screen, passing in the
   * params
   */
  const viewAll = params => navigate('ViewAll', params);

  /**
   * When the user clicks the button, navigate to the Goals screen.
   */
  const viewGoals = () =>
    navigate('Goals', {
      title: 'Set Your Feelings',
      description: 'How would you like to feel today?',
      post: '/update-feelings',
      get: '/user-feelings',
    });

  /**
   * It navigates to the Subscription screen and passes the title Subscription as a parameter
   */
  const viewSubscription = () =>
    navigate('Subscription', {title: 'Subscription'});

  /**
   * It navigates to the Badges screen.
   */
  const viewBadges = () => navigate('Badges', {title: 'Badges'});

  /**
   * It navigates to the Reminders screen and passes in the params object
   */
  const viewReminders = setReminder =>
    navigate('Reminders', {title: 'My Reminders', setReminder});

  /**
   * It navigates to the Settings screen and passes the title 'Meditation Setting' as a parameter.
   */
  const viewMeditation = () =>
    navigate('Settings', {title: 'Mediation Setting'});

  /**
   * It takes a parameter called params, and then navigates to the ReminderDetail screen, passing in the
   * params
   */
  const reminderDetail = params => navigate('ReminderDetail', params);

  /**
   * It takes a parameter called params, and then navigates to the LibraryDetails screen, passing in the
   * params
   */
  const libraryDetail = params => navigate('LibraryDetails', params);

  /**
   * It takes a parameter called params, and then navigates to the MusicPlayer screen, passing in the
   * params
   */
  const playAudio = params => navigate('MusicPlayer', params);

  /**
   * It dispatches an action to the redux store, which will then update the state of the app
   */
  const onRefresh = async () => {
    const {ok, data} = await API.get('/user-reminder');
    if (ok)
      setReminders(
        !data.reminders?.length
          ? [{title: 'Set a Reminder', id: 1}]
          : data?.reminders,
      );
    dispatch(getHomeScreenContent());
  };

  const recentAchievements = () => navigate('Badges', {title: 'Badges'});
  /* A react hook that is used to perform side effects in function components. */
  useEffect(() => {
    const event = addListener('focus', onRefresh);
    return event;
  }, []);
  /* Returning an object with all the functions and variables that are used in the Home screen. */
  return {
    user,
    homeContent,
    reminders,
    onRefresh,
    viewAll,
    viewGoals,
    viewSubscription,
    viewBadges,
    viewReminders,
    viewMeditation,
    reminderDetail,
    libraryDetail,
    recentAchievements,
    playAudio,
    isSubscript,
  };
};

export default useHome;
