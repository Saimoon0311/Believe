import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize} from '@/theme/Variables';
import {Touchable} from '@/components/Touchable';
import BlurImage from '@/components/BlurImage';
import {star} from '@/Assets/Images';

const WalletHeader = ({user, onOpen}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowCenter}>
        <BlurImage
          radius={20}
          styles={styles.image}
          uri={user?.profile_image}
          blurhash={user?.hash_code}
        />
        <View style={styles.paddingLeft}>
          <Text numberOfLines={1} style={styles.title}>
            Hi {user?.name?.split(' ')?.slice(0, 1)},
          </Text>
          <Text numberOfLines={1} style={styles.subTitle}>
            Welcome to Believe Rewards
          </Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.rowEnd}>
          <View style={styles.box}>
            <Image source={star} style={styles.iconTitle} />
            <View style={styles.leftSpacing}>
              <Text numberOfLines={1} style={styles.heading}>
                Points Available
              </Text>
              <Text numberOfLines={1} style={styles.token}>
                720 Coins Expires tonight
              </Text>
            </View>
          </View>
          <View>
            <Text numberOfLines={1} style={styles.count}>
              2715
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Touchable onPress={onOpen} Opacity={0.7} style={styles.freeCard}>
          <Text numberOfLines={1} style={styles.freeText}>
            Get Free Points
          </Text>
        </Touchable>
      </View>
    </View>
  );
};

export default WalletHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 65,
    height: 65,
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: Colors.white,
  },
  title: {
    fontSize: FontSize.xlarge,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  card: {
    height: 90,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryFaded,
  },
  rowEnd: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconTitle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  heading: {
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.medium,
  },
  token: {
    marginTop: 2.5,
    textAlign: 'left',
    color: Colors.fadedGray,
    fontSize: FontSize.regular + 1,
    fontFamily: FontFamily.regular,
  },
  count: {
    fontSize: 32,
    textAlign: 'right',
    color: Colors.green,
    fontFamily: FontFamily.regular,
  },
  subTitle: {
    paddingTop: 5,
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.default,
    fontFamily: FontFamily.regular,
  },
  freeCard: {
    height: 70,
    marginTop: 20,
    borderWidth: 1.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.borderGreen,
    backgroundColor: Colors.greenFaded,
  },
  freeText: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  paddingLeft: {
    paddingLeft: 15,
  },
  leftSpacing: {
    paddingLeft: 7.5,
  },
});
