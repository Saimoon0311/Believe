import {Colors, FontFamily} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    marginHorizontal: '5%',
    // marginHorizontal: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
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
  text: {
    fontSize: 18,
    color: Colors.white,
  },
});
