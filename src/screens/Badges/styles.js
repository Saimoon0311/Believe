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
  },
  headerContainer: {
    alignItems: 'center',
  },
  badgeView: {
    paddingVertical: 20,
  },
  activeBadge: {
    fontSize: 28,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.bold,
  },
  detailBadge: {
    fontSize: 20,
    marginTop: 5,
    color: Colors.gray,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
  },
});
