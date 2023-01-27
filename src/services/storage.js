import {storage} from '@/utils/helper/cache';

const storeToken = (key, value) => storage.set(key, value);
const setTimerToken = (key, value) => storage.set(key, JSON.stringify(value));
const getTimerTokem = key => JSON.parse(storage.getString(key));
const getToken = () => storage.getString('USER/TOKEN');

const storeValue = (key, value) => storage.set(key, value);
const storeDownloadedFiles = (key, value) =>
  storage.set(key, JSON.stringify(value));
const getValue = key => storage.getString(key);
const getDownloadedFiles = key => storage.getString(key);

const removeToken = () => {
  storage.clearAll();
  storeOnBoardToken('ONBOARD/TOKEN', 'true');
};
const storeOnBoardToken = (key, value) => storage.set(key, value);
const getOnBoardToken = () => storage.getString('ONBOARD/TOKEN');

const saveReminders = reminders =>
  storage.set('reminders', JSON.stringify(reminders));

const getReminders = () => storage.getString('reminders');
const hasKey = key => storage.contains(key);

export {
  storeToken,
  getToken,
  setTimerToken,
  getTimerTokem,
  storeOnBoardToken,
  getOnBoardToken,
  removeToken,
  saveReminders,
  getReminders,
  hasKey,
  storeValue,
  getValue,
  storeDownloadedFiles,
  getDownloadedFiles,
};
