import React from 'react';
import {View, Text} from 'react-native';
import SafeView from '@/components/SafeView';
import MarkItem from '@/components/MarkItem';
import InputField from '@/components/InputField';
import KeyBoardWrapper from '@/components/KeyboardWrapper';
import ActionButton from '@/components/ActionButton';
import UseNewPassword from './UseNewPassword';
import styles from './styles';
import BackButton from '@/components/BackButton';
import AnimatedBackground from '@/components/AnimatedBackground';

const NewPassword = ({navigation, route}) => {
  const {errors, control, handleSubmit, goBack, onSubmit} = UseNewPassword({
    navigation,
    route,
  });

  return (
    <AnimatedBackground animation={normal}>
      <BackButton {...{navigation, home: true}} />
      <KeyBoardWrapper>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>New Password</Text>
          </View>
          <View style={styles.marker}>
            <MarkItem>Password must be at least 8 characters long.</MarkItem>
            <MarkItem>Password must contain at least one upper case.</MarkItem>
            <MarkItem>One lower case letter.</MarkItem>
            <MarkItem>
              Password must contain at least one number or special character
            </MarkItem>
          </View>
          <View style={styles.inputBox}>
            <InputField
              {...{
                name: 'new_password',
                label: 'New Password',
                placeholder: 'Enter your password',
                control,
                errors,
                isRequired: true,
                isSecure: true,
                type: 'password',
              }}
            />
            <InputField
              {...{
                name: 'confirm_password',
                label: 'Re-type Password',
                placeholder: 'Enter your confirm password',
                control,
                errors,
                isRequired: true,
                type: 'password',
                isSecure: true,
              }}
            />
          </View>
          <View style={styles.buttonBox}>
            <ActionButton
              {...{
                onPress: handleSubmit(onSubmit),
                buttonTitle: 'Submit',
              }}
            />
          </View>
          <Text onPress={goBack} style={styles.desc}>
            Cancel
          </Text>
        </View>
      </KeyBoardWrapper>
    </AnimatedBackground>
  );
};

export default NewPassword;
