import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';
import {normal} from '@/Assets/lottie';

const flexSTyle = {height: '100%'};

const AnimatedBackground = ({animation, children, style}) => (
  <View style={flexSTyle}>
    <Lottie
      source={animation || normal}
      style={StyleSheet.absoluteFill}
      autoPlay
      loop
      resizeMode="cover"
    />
    <SafeAreaView style={flexSTyle}>{children}</SafeAreaView>
  </View>
);

export default AnimatedBackground;
