import React from 'react';
import {Text, View, Platform, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import useReduxStore from '@/hooks/useReduxStore';
import {socialLogin} from '@/store/actions/auth-action';
import Button from './Button';

const SocialIcons = ({title, navigation, route, height = 220}) => {
  const platform = Boolean(Platform.OS == 'android');
  const {params} = route || {};
  const {dispatch} = useReduxStore();
  const onSocialLogin = provider => dispatch(socialLogin({provider, params}));
  const isValid = Boolean(params);
  const screenParam = !isValid ? {screen: 'SetGoals'} : params;
  const routes = isValid ? 'Register' : 'OnboardStack';
  const onLogin = () => navigation.navigate(routes, screenParam);

  return (
    <View style={styles.socialLoginContainer(height)}>
      {Boolean(title) && <Text style={styles.title}>or sign in with</Text>}
      {platform ? (
        <Button
          title="Continue with Google"
          icon="google"
          onPress={() => onSocialLogin({name: 'google'})}
        />
      ) : (
        <Button
          title="Continue with Apple"
          icon="apple"
          onPress={() => onSocialLogin({name: 'apple'})}
        />
      )}
      <Button onPress={onLogin} title="Continue with Email" icon="email" />
      <Button
        title="Continue with Facebook"
        icon="facebook"
        onPress={() => onSocialLogin({name: 'facebook'})}
      />
    </View>
  );
};
export default SocialIcons;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  subContainer: {
    width: '85%',
    paddingBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
    marginBottom: 10,
  },
  line: {
    height: 1,
    width: '22.5%',
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    width: '70%',
    paddingTop: '1.5%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '7.5%',
    justifyContent: 'space-between',
  },
  button: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.white,
    backgroundColor: Colors.blurWhite,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  socialLoginContainer: height => ({
    height,
    justifyContent: 'space-around',
    width: '100%',
  }),
});
