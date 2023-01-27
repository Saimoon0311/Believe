import {Colors, FontFamily} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '30%',
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
    width: '95%',
    paddingLeft: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '3%',
    backgroundColor: Colors.fadeBlue,
  },
  view: {
    width: '90%',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  time: {
    fontSize: 18,
    marginLeft: 10,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 2.5,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.light,
  },
  bottom: {
    marginBottom: '5%',
    marginHorizontal: '5%',
  },
  card: {
    marginVertical: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  sound: {
    width: '70%',
    fontSize: 20,
    marginLeft: 15,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
});
