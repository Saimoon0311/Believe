import {Colors, FontFamily} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '5%',
    marginHorizontal: '5%',
    // justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  bottom: {
    marginBottom: '5%',
    marginHorizontal: '5%',
  },
});
