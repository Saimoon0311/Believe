import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: '2.5%',
    marginHorizontal: '5%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  artistList: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'left',
    color: Colors.white2,
    fontSize: FontSize.large,
    fontFamily: FontFamily.regular,
  },
  contentTitle: {
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.medium,
  },
  type: {
    textAlign: 'left',
    color: Colors.white2,
    fontSize: FontSize.regular,
    fontFamily: FontFamily.regular,
  },
  duration: {
    color: Colors.white2,
    fontSize: FontSize.regular,
    fontFamily: FontFamily.regular,
  },
  descriptionLine: {
    marginTop: 20,
    paddingBottom: 20,
  },
  description: {
    fontSize: 22,
    textAlign: 'left',
    color: Colors.white2,
    fontFamily: FontFamily.medium,
  },
  content: {
    fontSize: 24,
    textAlign: 'left',
    color: Colors.white2,
    fontFamily: FontFamily.regular,
    marginBottom: 10,
  },
});
