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
    marginHorizontal: '5%',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  referHeading: {
    paddingVertical: 40,
  },
  reffer: {
    fontSize: 24,
    paddingTop: 20,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  amount: {
    fontSize: 50,
    paddingTop: 5,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  referBox: {
    height: 70,
    width: '100%',
    marginTop: 10,
    borderWidth: 2,
    marginBottom: 60,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: Colors.borderBlue,
    backgroundColor: Colors.primaryFaded,
  },
  codeContainer: {
    marginRight: '27.25%',
  },
  referText: {
    fontSize: 30,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  shareButton: {
    height: 70,
    right: '-0.5%',
    width: '27.5%',
    borderWidth: 2,
    borderRadius: 10,
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: Colors.greenFaded,
    backgroundColor: Colors.greenCard3,
  },
  shareText: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  viewText: {
    fontSize: 16,
    textAlign: 'left',
    color: Colors.greenFaded,
    fontFamily: FontFamily.medium,
  },
  icon: {
    width: 12.5,
    height: 12.5,
    marginLeft: 7.5,
    resizeMode: 'contain',
    tintColor: Colors.greenFaded,
  },
});
