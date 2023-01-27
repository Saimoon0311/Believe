import {Colors} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  subContainer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  padding: {
    paddingTop: 20,
    paddingBottom: 50,
  },
});
