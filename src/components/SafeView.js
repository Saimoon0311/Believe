import React from 'react';
import {SafeAreaView, Platform} from 'react-native';
const isIos = Platform.OS === 'ios';
const SafeView = ({children, padding}) => (
  <SafeAreaView style={{flex: 1, paddingTop: isIos ? 0 : padding || 30}}>
    {children}
  </SafeAreaView>
);

export default SafeView;
