import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '5%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  editText: {
    marginTop: 10,
    fontSize: 12,
    color: Colors.greenFaded,
    fontFamily: FontFamily.regular,
  },
  deleteText: {
    marginTop: 10,
    fontSize: 12,
    color: Colors.redFade,
    fontFamily: FontFamily.regular,
  },
  rowBack: {
    width: '100%',
    height: Sizes.height * 0.1,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'flex-end',
    backgroundColor: '#07385C',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    height: 80,
    width: 60,
  },
  backRightBtnLeft: {
    right: 60,
  },
  backRightBtnRight: {
    right: 0,
  },
});
