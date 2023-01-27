import React from 'react';
import {View, Text} from 'react-native';
import SafeView from '@/components/SafeView';
import InputField from '@/components/InputField';
import KeyBoardWrapper from '@/components/KeyboardWrapper';
import BackButton from '@/components/BackButton';
import {normal} from '@/Assets/lottie';
import UseForget from './UseForget';
import styles from './styles';
import Button from '@/components/Button';
import AnimatedBackground from '@/components/AnimatedBackground';

const Forget = ({navigation}) => {
  const {errors, control, handleSubmit, goBack, onSubmit} = UseForget({
    navigation,
  });

  return (
    <AnimatedBackground animation={normal}>
      <SafeView>
        <BackButton {...{navigation, home: true}} />
        <KeyBoardWrapper>
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <View>
                <Text style={styles.heading}>Forget Password</Text>
                <Text style={styles.desc}>
                  Provide your account's email for which you want to reset your
                  password.
                </Text>
              </View>
              <InputField
                {...{
                  name: 'email',
                  label: 'E-mail',
                  placeholder: 'Enter your email or phone',
                  control,
                  errors,
                  isRequired: true,
                }}
              />
              <View style={styles.buttonBox}>
                {/* <ActionButton
                  {...{
                    onPress: handleSubmit(onSubmit),
                    buttonTitle: 'Send Reset Password Link',
                  }}
                /> */}
                <Button.Normal
                  title="Send Reset Password Link"
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
              <Text onPress={goBack} style={styles.desc}>
                Cancel
              </Text>
            </View>
          </View>
        </KeyBoardWrapper>
      </SafeView>
    </AnimatedBackground>
  );
};

export default Forget;
