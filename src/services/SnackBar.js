import {Colors} from '@/theme/Variables';
import Snackbar from 'react-native-snackbar';
const duration = Snackbar.LENGTH_LONG;
const textColor = Colors.white;

const showSuccess = text =>
  Snackbar.show({
    text,
    duration,
    backgroundColor: Colors.primaryColor,
    textColor,
  });

const showInfo = text =>
  Snackbar.show({
    text,
    duration,
    backgroundColor: Colors.primaryColor,
    textColor,
  });

const showError = text =>
  Snackbar.show({text, duration, backgroundColor: Colors.redFade, textColor});

export {showError, showInfo, showSuccess};
