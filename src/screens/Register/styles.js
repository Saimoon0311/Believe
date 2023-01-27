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
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.bold,
    // fontSize: FontSize.scale32 - 4,
    fontSize: 32,
  },
  buttonBox: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  text: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 16,
    // fontSize: FontSize.scale16,
    fontFamily: FontFamily.regular,
  },
  textButton: {
    marginLeft: 2.5,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 16,
    // fontSize: FontSize.scale16,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.semiBold,
  },
});

export default styles;
