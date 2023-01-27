import React from 'react';
import {StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';
import * as Badges from '@/Assets/lottie';

const Badge = ({item}) => (
  <View style={[styles.badgeContainer(item?.unlocked_status)]}>
    <Lottie
      source={Badges[item?.name]}
      autoPlay={item?.unlocked_status}
      style={styles.badge}
    />
  </View>
);

export default Badge;

const styles = StyleSheet.create({
  badgeContainer: locked => ({
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: locked ? 1 : 0.3,
  }),
  badge: {height: 110},
});
