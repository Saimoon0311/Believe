import {Colors, FontFamily} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // marginHorizontal: '5%',
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
  button: {
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '2%',
    marginHorizontal: '4%',
    paddingHorizontal: 15,
    backgroundColor: Colors.card,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  textfield: {
    // width: '100%',
    // marginHorizontal: '5%',
    // borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: Colors.white,
    justifyContent: 'space-between',
    backgroundColor: Colors.blueMenu2,
    // backgroundColor: Colors.searchFaded,
  },
  icon: {
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  input: {
    // textAlign: 'left',
    // width: '80%',
    flex: 1,
    color: Colors.white,
    height: 50,
    fontFamily: FontFamily.medium,
    // backgroundColor: 'red',
    // borderRadius: 10,
    paddingHorizontal: 10,
  },
});
