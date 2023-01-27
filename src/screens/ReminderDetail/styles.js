import {StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';

export const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 80,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    paddingBottom: 20,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.bold,
  },
  time: {
    fontSize: 36,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  active: {
    fontSize: 24,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
    paddingRight: 15,
  },
  heading: {
    fontSize: 28,
    paddingTop: 20,
    textAlign: 'center',
    color: Colors.yellow2,
    fontFamily: FontFamily.medium,
  },
  bottom: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
  },
});
