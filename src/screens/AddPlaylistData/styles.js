import {Colors} from '@/theme/Variables';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  searchBar: {
    width: wp('80'),
    height: hp('6'),
    alignSelf: 'center',
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: Colors.blueMenu2,
    marginVertical: hp('5'),
    color: Colors.white,
  },
  container: {
    flex: 1,
    marginHorizontal: '5%',
  },
});
