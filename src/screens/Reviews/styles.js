import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    marginHorizontal: '5%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  text: {
    fontSize: 18,
    textAlign: 'right',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  padding: {
    paddingTop: '7.5%',
  },
});
