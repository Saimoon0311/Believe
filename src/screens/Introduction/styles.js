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
    marginHorizontal: '5%',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
  },
  badgeView: {
    paddingVertical: 20,
  },
  heading: {
    fontSize: 20,
    textAlign: 'left',
    color: Colors.fadedGray,
    fontFamily: FontFamily.regular,
  },
  title: {
    fontSize: 28,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.bold,
  },
  bottom: {
    marginBottom: '5%',
    marginHorizontal: '5%',
  },
});
