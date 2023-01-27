import React from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const SafeAreaKeyboard = ({children}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView enabled style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {children}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SafeAreaKeyboard;
