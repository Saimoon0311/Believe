import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
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
    marginTop: 10,
    paddingBottom: 40,
  },
  description: {
    fontSize: 22,
    lineHeight: 30,
    textAlign: 'left',
    color: Colors.white2,
    fontFamily: FontFamily.regular,
  },
  subContainer: {
    paddingTop: 10,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 250,
    borderRadius: 10,
    // resizeMode: 'contain',
  },
  card: {
    zIndex: 1,
    bottom: 0,
    height: 60,
    width: 200,
    paddingLeft: 10,
    alignItems: 'center',
    paddingVertical: 10,
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.gray2,
  },
  text: {
    fontSize: 14,
    paddingLeft: 5,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.light,
  },
  button: {
    marginTop: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.yellow2,
  },
  download: {
    fontSize: 22,
    paddingLeft: 10,
    textAlign: 'left',
    color: Colors.yellow2,
    fontFamily: FontFamily.medium,
  },
  center: {
    paddingBottom: 30,
    alignItems: 'center',
  },
});
