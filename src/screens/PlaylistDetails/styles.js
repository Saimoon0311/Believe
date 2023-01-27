import {Colors} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '5%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  container2: {
    width: '100%',
    padding: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  hide: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: Colors.transparent,
  },
  playButton: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
  },
  play: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.greenFaded,
  },
  autoplay: {
    width: 25,
    height: 25,
    marginRight: 10,
    resizeMode: 'contain',
    tintColor: Colors.greenFaded,
    opacity: 0,
  },
  center: {
    alignItems: 'center',
  },
});
