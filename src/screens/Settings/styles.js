import {StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';

export const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: '5%',
    // backgroundColor: Colors.darkBlue,
  },
  heading: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  seperator: {
    marginBottom: 15,
  },
  bottomSeperator: {
    marginBottom: 40,
  },
});
