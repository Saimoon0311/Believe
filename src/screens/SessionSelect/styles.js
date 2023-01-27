import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: '25%',
    height: '75%',
    alignItems: 'center',
    marginHorizontal: '5%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  pickerContainer: {
    paddingBottom: 60,
    alignItems: 'center',
    flexDirection: 'row',
    width: Sizes.width * 0.65,
    justifyContent: 'space-between',
  },
});
