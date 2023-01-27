import {MMKV} from 'react-native-mmkv';
export const storage = new MMKV();
// console.log('first', storage.getAllKeys());
const prefix = 'cache';
// const expiryInMinutes = 5;
const store = async (key, value) => {
  const item = {
    value,
    timeStamp: Date.now(),
  };
  storage.set(prefix + key, JSON.stringify(item));
};

// const isExpired = item => {
//   const now = moment(Date.now());
//   const storedTime = moment(item.timeStamp);
//   return now.diff(storedTime, 'minutes') > expiryInMinutes;
// };

const get = key => {
  const isValid = storage.contains(prefix + key);
  if (!isValid) return null;
  const value = storage.getString(prefix + key);
  const item = JSON.parse(value);
  if (!item) return null;
  // if (isExpired(item)) {
  //   storage.delete(prefix + key);
  //   return null;
  // }

  return item.value;
};

export default {store, get};
