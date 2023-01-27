import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

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

  // XXXXXXXXXXXXXXXXXX music code style xxxxxxxxxxxxxxxxxxxxxx

  listContainer: {
    // flex: 1,
    // height: '90%',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  card: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: '90%',
    borderRadius: 10,
  },
  slider: {
    height: 15,
    width: '100%',
  },
  thumb: {
    width: 13.25,
    height: 13.25,
  },
  rowEnd: {
    marginTop: 7.5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  position: {
    fontSize: 13,
    textAlign: 'left',
    color: Colors.blurWhite2,
    fontFamily: FontFamily.regular,
  },
  duration: {
    fontSize: 13,
    textAlign: 'right',
    color: Colors.blurWhite2,
    fontFamily: FontFamily.regular,
  },
  description: {
    fontSize: 22,
    color: Colors.white,
    textAlign: 'center',
    paddingVertical: 15,
    fontFamily: FontFamily.medium,
  },
  date: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
  },
  controllers: {
    width: '100%',
    marginTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cornerButton: {
    width: 26.5,
    height: 17,
    resizeMode: 'contain',
    tintColor: Colors.blurWhite2,
  },
  center: {
    width: '60%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  centerButton: {
    width: 26.5,
    height: 26.5,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 180,
    alignItems: 'center',
    resizeMode: 'contain',
    justifyContent: 'center',
    // backgroundColor: Colors.blurBlack,
    backgroundColor: Colors.blurWhite1,
  },
  buttonMedium: {
    color: Colors.white,
    fontSize: heightPercentageToDP('3'),
    // width: 55,
    // height: 55,
    // borderRadius: 180,
    // alignItems: 'center',
    // resizeMode: 'contain',
    // justifyContent: 'center',
    // backgroundColor: Colors.blurBlack,
  },
  buttonSmall: {
    // width: 45,
    // height: 45,
    // borderRadius: 180,
    // alignItems: 'center',
    // resizeMode: 'contain',
    // justifyContent: 'center',
    // backgroundColor: Colors.blurBlack,
  },
  playerButton: {
    width: 26.5,
    height: 26.5,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  name: {
    fontSize: 36,
    paddingBottom: 10,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.light,
  },
  category: {
    fontSize: 22,
    paddingBottom: 10,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
  },
  time: {
    fontSize: 22,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  //     XXXXXXXXXXXXXXXXXXX end XXXXXXXXXXXXXXXXXX
});
