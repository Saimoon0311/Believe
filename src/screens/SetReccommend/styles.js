import {Colors, FontFamily} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '15%',
    marginHorizontal: '5%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  subContainer: {
    marginVertical: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: 55,
    width: '36%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '3%',
    justifyContent: 'space-between',
    backgroundColor: Colors.fadeBlue,
  },
  time: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  text: {
    fontSize: 14,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  bottom: {
    marginBottom: '5%',
    marginHorizontal: '5%',
  },
});
