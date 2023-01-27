import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // height: '90%',
    marginHorizontal: '5%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  descriptionLine: {
    paddingBottom: 10,
  },
  description: {
    fontSize: 16,
    // lineHeight: 30,
    textAlign: 'left',
    color: Colors.white2,
    fontFamily: FontFamily.regular,
  },
  title: {
    textAlign: 'left',
    color: Colors.white2,
    fontSize: FontSize.large,
    fontFamily: FontFamily.regular,
  },
  sliderCard: {
    left: 0,
    right: 0,
    bottom: 30,
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '7.5%',
    justifyContent: 'space-between',
  },
  slider: {
    height: 5,
    width: '70%',
  },
  thumb: {
    width: 15,
    height: 15,
  },
  minIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  maxIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
