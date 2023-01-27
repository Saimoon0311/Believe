import {Colors, FontFamily} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '5%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  heading: {
    fontSize: 22,
    textAlign: 'center',
    color: Colors.white,
    paddingVertical: 20,
    fontFamily: FontFamily.medium,
  },
  subHeading: {
    fontSize: 16,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabButton: active => ({
    backgroundColor: active ? 'rgba(29, 134, 202, 0.5)' : Colors.transparent,
    height: 50,
    width: 179,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
