import React from 'react';
import {View, Text} from 'react-native';
import InputField from '@/components/InputField';
import ActionButton from '@/components/ActionButton';
import KeyBoardWrapper from '@/components/KeyboardWrapper';
import UseVerification from './UseVerification';
import BackButton from '@/components/BackButton';
import {normal} from '@/Assets/lottie';
import styles from './styles';
import AnimatedBackground from '@/components/AnimatedBackground';

const Verification = ({navigation, route}) => {
  const {
    email,
    timer,
    errors,
    control,
    getTime,
    handleSubmit,
    resendCode,
    onSubmit,
  } = UseVerification({
    navigation,
    route,
  });

  return (
    <AnimatedBackground animation={normal}>
      <BackButton {...{navigation, home: true}} />
      <KeyBoardWrapper>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <View style={{paddingHorizontal: 20}}>
              <Text style={styles.heading}>OTP Verification</Text>
              <Text style={styles.desc}>Enter OTP sent to {email}</Text>
            </View>
            <InputField
              {...{
                name: 'reset_code',
                label: '',
                placeholder: 'Enter your verification code',
                control,
                errors,
                isRequired: true,
              }}
            />
            <View
              style={{
                paddingRight: 20,

                alignSelf: 'flex-end',
              }}>
              <Text style={styles.timer}>{getTime(timer)} minutes</Text>
            </View>
            <View style={styles.buttonBox}>
              <ActionButton
                {...{
                  onPress: handleSubmit(onSubmit),
                  buttonTitle: 'Verify Code',
                }}
              />
            </View>
            <Text onPress={timer == 0 ? resendCode : null} style={styles.desc}>
              Resend Code
            </Text>
          </View>
        </View>
      </KeyBoardWrapper>
    </AnimatedBackground>
  );
};

export default Verification;
