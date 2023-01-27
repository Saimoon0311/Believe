import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontFamily, Colors, FontSize} from '@/theme/Variables';
import InputField from '@/components/InputField';
import UseRegister from './UseRegister';
import FastImage from 'react-native-fast-image';
import {logo} from '@/Assets/Images';
import Button from '@/components/Button';
import {normal} from '@/Assets/lottie';
import KeyBoardWrapper from '@/components/KeyboardWrapper';
import AnimatedBackground from '@/components/AnimatedBackground';

const Register = ({navigation, route}) => {
  const {errors, control, handleSubmit, onSubmit, navLogin} = UseRegister(
    navigation,
    route,
  );
  return (
    <AnimatedBackground animation={normal}>
      <KeyBoardWrapper>
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <FastImage source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.logoDesc} numberOfLines={3}>
              Sign Up with Email
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <InputField
              {...{
                name: 'name',
                placeholder: 'Name',
                errors,
                control,
                isRequired: true,
                autoCapitalize: 'words',
              }}
            />
            <InputField
              {...{
                name: 'email',
                placeholder: 'Email Address',
                errors,
                control,
                isRequired: true,
              }}
            />
            <InputField
              {...{
                name: 'password',
                placeholder: 'Password',
                type: 'password',
                errors,
                control,
                isRequired: true,
                isSecure: true,
                maxLength: 25,
              }}
            />
            <InputField
              {...{
                name: 'confirm_password',
                placeholder: 'Confirm Password',
                type: 'password',
                errors,
                control,
                isRequired: true,
                maxLength: 25,
                isSecure: true,
              }}
            />
          </View>
          <Button.Normal title="SIGN UP" onPress={handleSubmit(onSubmit)} />
          <Text style={styles.alreadyText}>
            Already have an account?{' '}
            <Text onPress={navLogin} style={styles.underLine}>
              Sign in
            </Text>
          </Text>
        </View>
      </KeyBoardWrapper>
    </AnimatedBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    height: 160,
  },
  logo: {width: null, height: 80},
  logoDesc: {
    color: Colors.white,
    fontSize: FontSize.xlarge,
    textAlign: 'center',
    fontFamily: FontFamily.light,
    fontWeight: '300',
  },
  inputContainer: {
    marginTop: 40,
    marginBottom: 10,
  },
  underLine: {textDecorationLine: 'underline'},
  alreadyText: {
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.light,
    fontSize: FontSize.xlarge,
    marginTop: 10,
  },
});

export default Register;
