import {StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';

export const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  subContainer: {
    left: 0,
    right: 0,
    bottom: 60,
    position: 'absolute',
  },
  title: {
    fontSize: 50,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.light,
  },
  description: {
    fontSize: 22,
    marginTop: 12,
    lineHeight: 30,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.light,
  },
  dotContainer: {
    paddingTop: '12.5%',
  },
  leftButton: {
    left: 0,
    top: '3.5%',
    position: 'absolute',
  },
  rightButton: {
    right: 0,
    top: '3.5%',
    position: 'absolute',
  },
  rowMid: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
