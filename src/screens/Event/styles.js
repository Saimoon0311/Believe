import {Colors, FontFamily} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginHorizontal: '5%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  safearea: {
    flex: 1,
    alignItems: 'center',
  },
  mainContainer: {
    width: '90%',
    paddingBottom: 20,
    alignItems: 'center',
  },
});
