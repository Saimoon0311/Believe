import {useEffect, useState} from 'react';
import {getAllEvents} from '@/store/actions/content-action';
import useReduxStore from '@/hooks/useReduxStore';

const useEvent = ({navigation}) => {
  const {getState, dispatch} = useReduxStore();
  const {liveEvents} = getState('Content');

  const options = [
    {label: 'Attended', value: '1'},
    {label: 'Upcoming', value: '2'},
  ];
  const [card, setCard] = useState({value: '1'});

  // console.log('liveEvents', liveEvents);

  const {attended_events, upcoming_events} = liveEvents;

  const onRefresh = () => dispatch(getAllEvents());

  useEffect(() => {
    onRefresh();
  }, []);

  const data = card.value == '1' ? attended_events : upcoming_events;

  return {options, data, card, setCard, onRefresh};
};

export default useEvent;
