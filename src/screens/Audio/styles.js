import {StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Sizes.width,
    height: Sizes.height * 0.075,
    backgroundColor: Colors.primaryColor,
  },
  headerText: {
    color: Colors.white,
    fontSize: FontSize.scale20,
    fontFamily: FontFamily.semiBold,
  },
  listContainer: {
    alignItems: 'center',
    height: Sizes.height * 0.9,
  },
  listView: {
    width: Sizes.width * 0.95,
    height: Sizes.height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.black,
    marginVertical: Sizes.h10 / 2,
    paddingHorizontal: 10,
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  album: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  artistList: {
    marginTop: 7.5,
    marginLeft: 10,
  },
  name: {
    color: Colors.white,
    fontSize: FontSize.scale16,
    fontFamily: FontFamily.bold,
  },
  bottom: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  artist: {
    color: Colors.placeholder,
    fontSize: FontSize.scale12,
    fontFamily: FontFamily.regular,
  },
});
