import {Sizes} from '@/theme/Variables';
import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Overlay = () => (
  <View
    style={{
      width: '100%',
      height: '100%',
      zIndex: 100,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    }}>
    <ActivityIndicator size={'large'} color="#fff" />
  </View>
);

export default Overlay;
