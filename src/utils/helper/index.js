import auth from '@react-native-firebase/auth';
import {Dirs, FileSystem} from 'react-native-file-access';
import moment from 'moment';
import {nanoid} from 'nanoid';

const getCredentials = () => {
  if (__DEV__)
    return {
      baseURL: 'https://virtualrealitycreators.com/Believe-Backend/api',
    };
  else {
    console.log = () => {};
    return {
      baseURL: 'https://virtualrealitycreators.com/Believe-Backend/api',
    };
  }
};

export const deviceStorage = () => FileSystem.df();

const loginUser = ({email, password}) =>
  auth().signInWithEmailAndPassword(email, password);

const registerUser = ({email, password}) =>
  auth().createUserWithEmailAndPassword(email, password);

const resetUserEmail = ({email}) => auth().sendPasswordResetEmail(email);

const signInWithFirebase = data => auth().signInWithCredential(data);

const getFbResult = () => auth().currentUser.getIdTokenResult();

// Helper Functions

const minuteCall = num => {
  const duration = Number(Math.floor(num / 60));
  return duration == 0 ? 1 : duration;
};

const durationCall = duration => {
  const hour = moment.utc(duration * 1000).format('HH');
  const minute = moment.utc(duration * 1000).format('mm');
  const second = moment.utc(duration * 1000).format('ss');
  const checkHr = Boolean(hour != '00');
  const checkMin = Boolean(minute != '00');
  const checkSec = Boolean(second != '00');
  if (!checkHr && !checkMin && !checkSec) return `${minute}:${second} min`;
  else if (!checkHr && !checkMin && checkSec) return `${minute}:${second} min`;
  else if (!checkHr && checkMin && !checkSec) return `${minute}:${second} min`;
  else if (!checkHr && checkMin && checkSec) return `${minute}:${second} min`;
  else if (checkHr && checkMin && checkSec) return `${hour}:${minute} hr`;
  else if (checkHr && !checkMin && checkSec) return `${hour}:${minute} hr`;
  else if (checkHr && checkMin && !checkSec) return `${hour}:${minute} hr`;
  else if (checkHr && !checkMin && !checkSec) return `${hour}:${minute} hr`;
};

const courseTimeView = time => {
  const hour = moment.utc(time * 1000).format('HH');
  const minute = moment.utc(time * 1000).format('mm');
  const second = moment.utc(time * 1000).format('ss');
  const checkHr = Boolean(hour != '00');
  const checkMin = Boolean(minute != '00');
  const checkSec = Boolean(second != '00');
  if (!checkHr && !checkMin && !checkSec) return `${minute}min ${second}sec`;
  else if (!checkHr && !checkMin && checkSec)
    return `${minute}min ${second}sec`;
  else if (!checkHr && checkMin && !checkSec)
    return `${minute}min ${second}sec`;
  else if (!checkHr && checkMin && checkSec) return `${minute}min ${second}sec`;
  else if (checkHr && checkMin && checkSec) return `${hour}hr ${minute}min`;
  else if (checkHr && !checkMin && checkSec) return `${hour}hr ${minute}min`;
  else if (checkHr && checkMin && !checkSec) return `${hour}hr ${minute}min`;
  else if (checkHr && !checkMin && !checkSec) return `${hour}hr ${minute}min`;
};
const meditationTimeView = time => {
  const hour = moment.utc(time * 1000).format('HH');
  const minute = moment.utc(time * 1000).format('mm');
  const second = moment.utc(time * 1000).format('ss');
  return `${hour}h ${minute}m ${second}s`;
};

const eventDateView = date => {
  let date_1 = new Date(date);
  let date_2 = new Date();
  const days = (date_1, date_2) => {
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };
  const dateFiiter = days(date_1, date_2);
  if (dateFiiter == 0) {
    return `Today's Event`;
  } else if (dateFiiter == 1) {
    return `Tomorrow's Event`;
  } else if (dateFiiter == 7) {
    return `A Week Later`;
  } else if (dateFiiter == -1) {
    return `Yesterday's Event`;
  } else {
    return date;
  }
};

const generateDiscountStr = priceStr => {
  let array = priceStr?.split(/\s{1}/);
  const price = array?.length && array[array?.length - 1];
  const currency = array?.length && array[array?.length - 2];
  return `${currency} ${(Number(price?.split(',').join('')) / 12).toFixed(
    2,
  )}/month`;
};

const generateSubViewObject = subItem => {
  let packageTitle = '';
  let price = '';
  let title = '';
  let productId = '';
  let discountPrice;

  if (subItem?.platform == 'ios') {
    packageTitle =
      subItem?.subscriptionPeriodUnitIOS == 'MONTH' ? 'Monthly' : 'Yearly';
    price = subItem?.localizedPrice;
    title = subItem?.title;
    productId = subItem?.productId;
  } else {
    packageTitle =
      subItem?.subscriptionOfferDetails[0]?.pricingPhases?.pricingPhaseList[0]
        ?.billingPeriod == 'P1M'
        ? 'Monthly'
        : 'Yearly';
    price =
      subItem?.subscriptionOfferDetails[0]?.pricingPhases?.pricingPhaseList[0]
        ?.formattedPrice;
    title = subItem?.name;
    productId = subItem?.productId;
  }
  discountPrice = generateDiscountStr(price);
  return {
    title,
    price,
    packageTitle,
    discountPrice,
  };
};

function viewsFormatter(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
}

const timeLayout = time => {
  return moment(time).format('hh:mm A');
};

const AMPMLayout = time => {
  return Boolean(moment(time).format('A') == 'AM');
};

const contentTime = (time, format = false) => {
  if (!format) {
    const hour = moment.utc(time * 1000).format('HH');
    const minute = moment.utc(time * 1000).format('mm');
    const second = moment.utc(time * 1000).format('ss');
    return hour == '00' ? `${minute}:${second}` : `${hour}:${minute}:${second}`;
  }
  const hour = moment.utc(time * 1000).format('HH');
  const minute = moment.utc(time * 1000).format('mm');
  const second = moment.utc(time * 1000).format('ss');
  const hoursFormatted = hour !== '00' ? `${hour} hour ` : '';
  const minutesFormatted = minute !== '00' ? `${minute} minutes` : '';
  const secondFormatted = second !== '00' ? `${second} seconds` : '';
  return [hoursFormatted, minutesFormatted, secondFormatted].join('');
};

export const secondsToTime = timeInSeconds => {
  const hours = Math.floor(timeInSeconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((timeInSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(timeInSeconds % 60)
    .toString()
    .padStart(2, '0');
  return {seconds, minutes, hours};
};

const randomNanoIdGenerator = () => nanoid();
const keyExtractor = item => item?.id;

const durationAsString = date => {
  const start = new Date();
  const currentTime = new Date(date);
  currentTime.setDate(start.getDate());
  if (start.getTime() > currentTime.getTime())
    currentTime.setDate(start.getDate() + 1);

  const duration = moment.duration(moment(currentTime).diff(moment(start)));

  //Get Days
  const days = Math.floor(duration.asDays()); // .asDays returns float but we are interested in full days only
  const daysFormatted = days ? `${days}day ` : ''; // if no full days then do not display it at all

  //Get Hours
  const hours = duration.hours();
  const hoursFormatted = hours ? `${hours}hr ` : '';

  //Get Minutes
  const minutes = duration.minutes();
  const minutesFormatted = minutes ? `${minutes}min` : '';

  return [daysFormatted, hoursFormatted, minutesFormatted].join('');
};

export {
  getCredentials,
  loginUser,
  registerUser,
  resetUserEmail,
  signInWithFirebase,
  getFbResult,
  minuteCall,
  durationCall,
  courseTimeView,
  meditationTimeView,
  viewsFormatter,
  eventDateView,
  timeLayout,
  AMPMLayout,
  contentTime,
  randomNanoIdGenerator,
  keyExtractor,
  durationAsString,
  generateSubViewObject,
};
