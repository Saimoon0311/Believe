import {StyleSheet} from 'react-native';
import {Colors, FontSize, FontFamily, Sizes} from '@/theme/Variables';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: '90%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  headingContainer: {
    // padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.bold,
    fontSize: 32,
  },
  buttonBox: {
    paddingTop: 20,
    paddingBottom: 10,
    width: '100%',
  },
  desc: {
    paddingVertical: 20,
    textAlign: 'left',
    color: Colors.white,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
});

export default styles;
