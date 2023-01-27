import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Colors} from '@/theme/Variables';
import BlurImage from '@/components/BlurImage';
import {Touchable} from '@/components/Touchable';
import {photo} from '@/Assets/Images';

const Header = ({user, onPress, image}) => {
  return (
    <View style={styles.container}>
      <BlurImage
        radius={50}
        styles={styles.image}
        uri={image?.uri || user?.profile_image}
        blurhash={user?.hash_code}
      />
      <Touchable Opacity={0.7} style={styles.button} onPress={onPress}>
        <Image source={photo} />
      </Touchable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  image: {
    width: 165,
    height: 165,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: Colors.white,
  },
  button: {
    padding: 15,
    right: '27.5%',
    bottom: '17.5%',
    borderRadius: 180,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
});
