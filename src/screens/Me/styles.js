import {Colors, FontFamily} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
    paddingHorizontal: '5%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  content: {
    fontSize: 24,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  headerIcon: {
    paddingBottom: 20,
    alignItems: 'flex-end',
  },
  header: {
    width: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
