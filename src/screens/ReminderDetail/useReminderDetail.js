import {useState} from 'react';
import API from '@/services/API';

const useReminderDetail = param => {
  const {params} = param;
  const [isActive, setIsActive] = useState(params?.status == 1 ? true : false);
  const toggleNotification = async () => {
    addNotification();
  };

  const addNotification = async () => {
    const notification = {
      reminder_id: params?.id,
    };
    const {ok, data} = await API.put(`/reminder-status`, notification);
    if (ok) setIsActive(pre => !pre);
  };
  return {data: params, toggleNotification, isActive};
};

export default useReminderDetail;
