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
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.bold,
    fontSize: 32,
  },
  subHeading: {
    marginTop: 20,
    marginBottom: 30,
  },
  buttonBox: {
    paddingTop: 20,
  },
  text: {
    textAlign: 'center',
    color: Colors.white,
    // fontSize: FontSize.scale16,
    fontSize: 16,
    fontFamily: FontFamily.regular,
  },
  textButton: {
    textAlign: 'center',
    color: Colors.white,
    marginLeft: 2.5,
    // fontSize: FontSize.scale16,
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.semiBold,
  },
});

export default styles;
