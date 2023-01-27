import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  headerContainer: {
    alignItems: 'flex-end',
    // paddingVertical: 15,
    // flexDirection: 'row',
    // paddingHorizontal: 20,
    // justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  headerImage: {
    width: Sizes.width,
    height: Sizes.height * 0.25,
  },
  rightHeader: {
    height: 35,
    borderRadius: 90,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    // paddingVertical: 7.5,
    // backgroundColor: '#267581',
    backgroundColor: 'rgba(3,23,76,.3)',
  },
  icon: {
    width: 22.5,
    height: 27.5,
    resizeMode: 'contain',
  },
  icon2: {
    width: 20,
    height: 15,
    resizeMode: 'contain',
  },
  text: {
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  levelText: {
    marginLeft: 5,
    color: Colors.white,
    fontSize: FontSize.large,
    fontFamily: FontFamily.medium,
  },
  balanceText: {
    // marginLeft: 5,
    color: Colors.white,
    fontSize: FontSize.large,
    fontFamily: FontFamily.regular,
  },
  creditText: {
    color: Colors.white,
    fontSize: FontSize.large,
    fontFamily: FontFamily.bold,
  },
  headerText: {
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.bold,
  },
  seperator: {
    width: 1,
    height: 80,
    opacity: 0.2,
    backgroundColor: Colors.white,
  },
  center: {
    marginTop: 35,
    alignItems: 'center',
  },
  bottomHeading: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.green,
    fontFamily: FontFamily.regular,
  },
  bottomPara: {
    width: 85,
    fontSize: 14,
    marginTop: 10,
    lineHeight: 20,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
  },
  bottomText: {
    fontSize: 20,
    marginTop: 5,
    color: Colors.gray,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
  },
  box: {
    // flex: 1,
    height: 120,
    alignItems: 'center',
    flexDirection: 'row',
    // paddingHorizontal: 10,
    justifyContent: 'space-evenly',
    // backgroundColor: Colors.primaryColor,
  },
  bottomBox: {
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  background: {
    width: Sizes.width,
    // height: Sizes.height,
  },
  topPadding: {
    paddingTop: 10,
  },
  verticalPadding: {
    paddingVertical: 20,
  },
  padding: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    // marginTop: 30,
  },
});
