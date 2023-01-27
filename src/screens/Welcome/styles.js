// import {StyleSheet} from 'react-native';
// import {Sizes} from '@/theme/Variables';

// const styles = StyleSheet.create({
//   backgroundImage: {
//     width: '100%',
//     height: '100%',
//     overflow: 'hidden',
//     resizeMode: 'contain',
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerContainer: {
//     alignItems: 'center',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     height: '80%',
//   },
//   logo: {
//     height: Sizes.height * 0.25,
//     width: Sizes.width * 0.5,
//     resizeMode: 'contain',
//   },
//   box: {
//     alignItems: 'center',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     height: Sizes.height * 0.75,
//   },
// });

// export default styles;
import {StyleSheet} from 'react-native';
import {FontFamily, Colors, FontSize} from '@/theme/Variables';

const styles = StyleSheet.create({
  backgroundImage: {height: '100%', width: '100%'},
  contentContainer: {
    flex: 0.95,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    height: 220,
  },
  logo: {width: null, height: 80},
  logoDesc: {
    color: Colors.white,
    fontSize: FontSize.xlarge,
    textAlign: 'center',
    fontFamily: FontFamily.light,
    fontWeight: '300',
  },
  plusText: {
    color: Colors.white,
    fontSize: FontSize.xxlarge,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
    fontWeight: '400',
  },
  textContainer: {
    width: '100%',
    marginVertical: 10,
    marginLeft: 40,
  },
  description: {
    color: Colors.white,
    fontSize: FontSize.xlarge,
    textAlign: 'center',
    fontFamily: FontFamily.light,
    fontWeight: '300',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyText: {
    color: Colors.white,
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.regular,
    fontWeight: '300',
  },
  terms: {
    color: Colors.white,
    fontSize: FontSize.regular + 1,
    fontFamily: FontFamily.regular,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
  },
  underLine: {textDecorationLine: 'underline'},
  footerContainer: {
    marginTop: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
  },
  socialLoginContainer: {
    height: 250,
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default styles;
