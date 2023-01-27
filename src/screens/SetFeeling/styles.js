import {Colors, FontFamily} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // marginHorizontal: '5%',
  },
  mainContainer: {
    flex: 1,
    marginBottom: '5%',
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
  wrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bottom: {
    marginVertical: '5%',
    marginHorizontal: '5%',
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
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
});
