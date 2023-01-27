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
    fontSize: 32,
    fontFamily: FontFamily.bold,
  },
  inputBox: {
    marginTop: 60,
  },
  buttonBox: {
    marginTop: 20,
  },
  desc: {
    paddingVertical: 20,
    textAlign: 'left',
    color: Colors.white,
    fontSize: 14,
    fontFamily: FontFamily.bold,
    paddingBottom: 30,
  },
  marker: {
    width: '90%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default styles;
