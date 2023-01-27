import {useEffect, useRef, useState} from 'react';
import {showError} from '@/services/SnackBar';
import API from '@/services/API';

const useReminders = (navigation, {params}) => {
  const data = params;
  const modalizeRef = useRef(null);
  const [selected, setSelected] = useState({});
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [listData, setListData] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);

  const hideDatePicker = () => setDatePickerVisibility(false);

  const closeRow = (rowMap, rowKey) => rowMap[rowKey]?.closeRow();

  const deleteRow = async (rowMap, rowKey) => {
    const {ok} = await API.delete(`/delete-reminder/${listData[rowKey]?.id}`);
    if (ok) onRefresh();
  };

  const onOpen = () => modalizeRef.current?.open();
  const onClose = () => {
    setTitle('');
    setDisabled(false);
    setSelected({});
    setTime('');
    modalizeRef.current?.close();
  };

  const reminderDetail = params =>
    navigation.navigate('ReminderDetail', params);

  const onRefresh = async () => {
    const {ok, data} = await API.get('/user-reminder');
    if (ok) setListData(data.reminders);
  };

  const onRowOpen = (rowKey, rowMap) => {
    setTimeout(() => {
      rowMap[rowKey]?.closeRow();
    }, 2000);
  };

  const onSave = async () => {
    if (time == '') return showError('Please select time');
    const notification = {
      ...(selected?.id && {id: selected.id}),
      title: title || 'Default Title',
      time,
    };
    const url = selected?.id ? `/update-reminder` : '/add-reminder';
    const {ok} = await API.post(url, notification);
    if (ok) onRefresh();
    onClose();
  };

  const onEdit = async (rowMap, rowKey) => {
    const selectedNotification = listData[rowKey];
    const {title, time} = selectedNotification;
    modalizeRef.current?.open();
    setSelected(selectedNotification);
    setTitle(title);
    setTime(time);
  };

  useEffect(() => {
    const event = navigation.addListener('focus', onRefresh);
    if (data?.setReminder) onOpen();
    return event;
  }, []);
  return {
    data,
    title,
    listData,
    disabled,
    modalizeRef,
    isDatePickerVisible,
    time,
    onEdit,
    setTime,
    onOpen,
    onSave,
    onClose,
    closeRow,
    setTitle,
    onRefresh,
    onRowOpen,
    deleteRow,
    setDisabled,
    reminderDetail,
    showDatePicker,
    hideDatePicker,
  };
};

export default useReminders;
