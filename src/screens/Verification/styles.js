import {StyleSheet} from 'react-native';
import {Colors, FontSize, FontFamily, Sizes} from '@/theme/Variables';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  headingContainer: {
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 32,
    fontFamily: FontFamily.bold,
  },
  buttonBox: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  desc: {
    paddingVertical: 20,
    textAlign: 'left',
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
  timer: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.regular,
    color: Colors.white,
    fontSize: 14,
  },
});

export default styles;
