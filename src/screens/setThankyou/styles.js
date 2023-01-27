import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  subcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '10%',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: '10%',
    // marginBottom: '5%',
  },
  subContainer: {
    marginHorizontal: '5%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  backgroundImage2: {
    // width: '100%',
    // height: '30%',
    // overflow: 'hidden',
    resizeMode: 'cover',
    // backgroundColor: Colors.primaryColor,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // width: null,
    // height: '50%'
  },
  wrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  button: {
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: '2%',
    paddingHorizontal: 20,
    marginHorizontal: '5%',
    justifyContent: 'center',
  },
  bottom: {
    marginVertical: '5%',
    marginHorizontal: '5%',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  heading: {
    fontSize: 28,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.light,
  },
  subTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 5,
    color: Colors.fadedGray,
    // width: Sizes.width * 0.7,
    fontFamily: FontFamily.regular,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.light,
  },
  blurTouch: {
    height: 200,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});
