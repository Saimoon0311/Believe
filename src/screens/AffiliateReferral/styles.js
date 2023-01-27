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
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  earningBox: {
    height: 70,
    width: '100%',
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: Colors.greenFaded,
    backgroundColor: Colors.greenCard3,
  },
  earning: {
    fontSize: 30,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  subContainer: {
    paddingTop: 70,
  },
  cardContainer: {
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 10,
    height: 407.5,
    borderColor: Colors.borderBlue,
    backgroundColor: Colors.primaryFaded,
  },
  line: {
    borderWidth: 0.5,
    marginHorizontal: 20,
    borderColor: Colors.borderBlue,
  },
});
