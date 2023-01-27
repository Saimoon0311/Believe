import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const KeyBoardWrapper = ({children}) => (
  <KeyboardAwareScrollView
    showsVerticalScrollIndicator={false}
    bounces={false}
    contentContainerStyle={{flexGrow: 1}}>
    {children}
  </KeyboardAwareScrollView>
);

export default KeyBoardWrapper;
