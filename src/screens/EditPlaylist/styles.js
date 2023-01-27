import {Colors, FontFamily} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  center: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: '5%',
  },
});
