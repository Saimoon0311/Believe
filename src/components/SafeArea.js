import React from 'react';
import {SafeAreaView} from 'react-native';
import {Colors} from '@/theme/Variables';

const SafeArea = ({children}) => (
  <SafeAreaView style={{flex: 1, backgroundColor: Colors.primaryColor}}>
    {children}
  </SafeAreaView>
);

export default SafeArea;
