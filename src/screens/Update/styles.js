import {StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
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
    padding: 30,
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 32,
    fontFamily: FontFamily.bold,
  },
  desc: {
    paddingVertical: 20,
    paddingBottom: 30,
    textAlign: 'left',
    fontSize: 14,
    color: Colors.white,
    fontFamily: FontFamily.bold,
  },
});

export default styles;
