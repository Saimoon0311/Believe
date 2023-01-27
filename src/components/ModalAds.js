import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {Touchable} from './Touchable';
import {Colors, FontFamily} from '@/theme/Variables';
import {cross} from '@/Assets/Images';

const ModalAds = ({onClose}) => {
  return (
    <View style={styles.container}>
      <View style={styles.bottom}>
        <Text style={styles.heading}>Watch an Ad to Get</Text>
        <Text style={styles.points}>10 Points</Text>
      </View>
      <Touchable Opacity={0.7} style={styles.shareButton}>
        <Text style={styles.shareText}>Watch Now</Text>
      </Touchable>
      <Touchable onPress={onClose} Opacity={0.7} style={styles.crossButton}>
        <Image source={cross} style={styles.cross} />
        {/* <Text style={styles.number}>8</Text> */}
      </Touchable>
    </View>
  );
};

export default ModalAds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    height: 250,
    borderWidth: 1,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.border2,
    backgroundColor: Colors.darkFaded,
  },
  bottom: {
    paddingBottom: 20,
  },
  heading: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  points: {
    fontSize: 44,
    marginTop: 10,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  shareButton: {
    height: 45,
    borderWidth: 2,
    width: '100.5%',
    bottom: '-0.5%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderColor: Colors.greenCard5,
    backgroundColor: Colors.greenFaded,
  },
  shareText: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  crossButton: {
    top: -10,
    width: 25,
    right: -10,
    height: 25,
    zIndex: 999,
    borderWidth: 2,
    borderRadius: 90,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.greenFaded,
    backgroundColor: Colors.greenCard4,
  },
  cross: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  number: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
});
