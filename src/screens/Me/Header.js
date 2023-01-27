import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import BlurImage from '@/components/BlurImage';

const Header = ({user}) => {
  return (
    <View style={styles.container}>
      <BlurImage
        radius={50}
        styles={styles.image}
        uri={user?.profile_image}
        blurhash={user?.hash_code}
      />
      <Text style={styles.title}>{user?.name}</Text>
      <Text
        numberOfLines={1}
        style={[
          styles.title,
          {fontSize: 14, marginTop: 10, fontWeight: '400'},
        ]}>
        {user?.email}
      </Text>
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    height: 300,
    paddingTop: 10,
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  image: {
    width: 165,
    height: 165,
    // borderWidth: 2,
    borderRadius: 50,
    // borderColor: Colors.white,
  },
  title: {
    fontSize: 28,
    marginTop: 40,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.bold,
  },
  align: {
    alignItems: 'center',
  },
  rowEnd: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconTitle: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  count: {
    fontSize: 36,
    paddingLeft: 12.5,
    textAlign: 'center',
    color: Colors.yellow,
    fontFamily: FontFamily.black,
  },
  subTitle: {
    fontSize: 18,
    paddingTop: 5,
    paddingLeft: 10,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
});
