import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: '90%',
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 10,
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
    fontSize: 34,
    lineHeight: 40,
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
  sliderBox: {
    left: 0,
    right: 0,
    bottom: 50,
    position: 'absolute',
  },
  sliderCard: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '7.5%',
    justifyContent: 'space-between',
  },
  slider: {
    height: 10,
    width: '70%',
  },
  thumb: {
    width: 15,
    height: 15,
    padding: 10,
  },
  minIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  maxIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  counter: {
    padding: 10,
  },
  scrollContent: {
    padding: 10,
    borderRadius: 10,
  },
});
