// import React from 'react';
// import {View, Text, ImageBackground} from 'react-native';
// import SafeView from '@/components/SafeView';
// import ActionButton from '../../components/ActionButton';
// import InputField from '../../components/InputField';
// import KeyBoardWrapper from '../../components/KeyboardWrapper';
// import UseLogin from './UseLogin';
// import {Touchable} from '@/components/Touchable';
// import styles from './styles';
// import {welcome} from '@/Assets/Images';
// import SocialIcons from '@/components/SocialIcons';
// import BackButton from '@/components/BackButton';

// const Login = ({navigation}) => {
//   const {errors, control, handleSubmit, navForget, navRegister, onSubmit} =
//     UseLogin({
//       navigation,
//     });

//   return (
//     <ImageBackground
//       source={welcome}
//       style={styles.backgroundImage}
//       resizeMode="stretch"
//       blurRadius={4.5}>
//       <SafeView>
//         <BackButton {...{navigation, home: true}} />
//         <KeyBoardWrapper>
//           <View style={styles.container}>
//             <View style={styles.headingContainer}>
//               <Text style={styles.heading}>Log In</Text>
//             </View>
//             <InputField
//               {...{
//                 name: 'email',
//                 placeholder: 'Enter your email',
//                 errors,
//                 control,
//                 isRequired: true,
//               }}
//             />
//             <InputField
//               {...{
//                 name: 'password',
//                 placeholder: 'Enter your password',
//                 type: 'password',
//                 errors,
//                 control,
//                 isRequired: true,
//                 isSecure: true,
//               }}
//             />
//             <View style={styles.buttonBox}>
//               <ActionButton
//                 {...{
//                   onPress: handleSubmit(onSubmit),
//                   buttonTitle: 'Login',
//                 }}
//               />
//             </View>
//             <Touchable style={styles.subHeading} onPress={navForget}>
//               <Text
//                 style={[
//                   styles.text,
//                   {
//                     textDecorationLine: 'underline',
//                   },
//                 ]}>
//                 Forgot Password ?
//               </Text>
//             </Touchable>
//             <View style={{alignItems: 'center', flexDirection: 'row'}}>
//               <Text style={styles.text}>Don't have an account? </Text>
//               <Touchable onPress={navRegister}>
//                 <Text style={styles.textButton}>Sign Up</Text>
//               </Touchable>
//             </View>
//             <SocialIcons title="or sign in with" />
//           </View>
//         </KeyBoardWrapper>
//       </SafeView>
//     </ImageBackground>
//   );
// };

// export default Login;

import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {normal} from '@/Assets/lottie';
import InputField from '../../components/InputField';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import UseLogin from './UseLogin';
import Button from '@/components/Button';
import SocialIcons from '@/components/SocialIcons';
import FadeView from '@/components/FadeView';
import AnimatedBackground from '@/components/AnimatedBackground';

const Login = ({navigation}) => {
  const {errors, control, handleSubmit, navForget, navRegister, onSubmit} =
    UseLogin({
      navigation,
    });
  return (
    <AnimatedBackground animation={normal}>
      <FadeView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcome}>Welcome Back!</Text>
            <Text style={styles.login}>Log In</Text>
          </View>
          <View>
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
              }}
            />
            <View style={styles.loginBtnContainer}>
              <Button.Normal
                onPress={handleSubmit(onSubmit)}
                title="LOGIN"
                height={64}
              />
              <Text onPress={navForget} style={styles.forgot}>
                Forgot Password?
              </Text>
            </View>
          </View>
          <SocialIcons navigation={navigation} title="or sign in with" />

          <Text style={styles.signUp}>
            Don’t have an account?{' '}
            <Text
              style={{textDecorationLine: 'underline'}}
              onPress={navRegister}>
              Sign Up
            </Text>
          </Text>
        </ScrollView>
      </FadeView>
    </AnimatedBackground>
  );
};
const styles = StyleSheet.create({
  bgImage: {
    width: Sizes.width,
    height: Sizes.height * 1.05,
  },
  signUp: {
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.light,
    fontSize: FontSize.xlarge,
  },
  forgot: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xlarge,
    marginTop: 10,
  },
  loginBtnContainer: {
    marginVertical: 10,
    justifyContent: 'space-around',
    height: 100,
  },
  login: {
    color: Colors.white,
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.regular,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 10,
  },
  welcome: {
    color: Colors.white,
    fontSize: FontSize.xxxlarge + 4,
    fontFamily: FontFamily.light,
    fontWeight: '300',
  },
  welcomeTextContainer: {marginBottom: 20},
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
});
export default Login;
