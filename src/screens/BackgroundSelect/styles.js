import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  switch: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  subContainer: {
    flex: 1,
    marginHorizontal: '5%',
  },
});
