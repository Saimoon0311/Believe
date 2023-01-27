import {useState} from 'react';
import moment from 'moment';
import * as OnBoardService from '@/services/onboard-service';

const useSetReccommend = ({navigation, route}) => {
  const data = route.params;
  const [time, setTime] = useState('Set Time');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // console.log('useSetReccommend', {...data, time});

  const stringType = Boolean(typeof time == 'string');
  const selectedTime = stringType ? time : moment(time).format('hh:mm A');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setTime(date);
    setHours(moment(date).format('hh'));
    setMinutes(moment(date).format('mm'));
  };

  const selectMoment = [
    {
      id: 1,
      title: 'Before Bed',
    },
    {
      id: 2,
      title: 'Morning',
    },
    {
      id: 3,
      title: 'Evening',
    },
    {
      id: 4,
      title: 'Free Time',
    },
  ];

  const [momentView, setMomentView] = useState({
    id: selectMoment[0].id,
    title: selectMoment[0].title,
  });

  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const onSelect = data => {
    setMomentView(data);
    hideMenu();
  };

  const GoNext = () => !stringType && onSubmit();

  const onSubmit = async () => {
    try {
      const {ok, data: responseData} =
        await OnBoardService.OnboardFinalizeService({
          user_name: data?.username,
          tracks_length: data?.track?.name,
          gender: data?.gender?.name,
          age: data?.age?.name,
          recommendation_time: time,
          moment: momentView?.title,
          usergoal_ids: data?.goals,
          userfeeling_ids: data?.feeling,
        });
      if (ok) navigation.navigate('Finalize', responseData);
    } catch (error) {
      console.log(error);
    }
  };

  // const GoNext = () =>
  //   !stringType && navigation.navigate('Finalize', {...data, time, momentView});

  return {
    visible,
    selectedTime,
    momentView,
    selectMoment,
    isDatePickerVisible,
    hideMenu,
    showMenu,
    onSelect,
    setMomentView,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    GoNext,
  };
};

export default useSetReccommend;
