import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '360199194045-a12ll3m7g5k2aritr98n1pb3p704evlu.apps.googleusercontent.com',
});

class SocialLogin {
  logInWithfacebook = async () => {
    this.logoutWithFacebook();
    LoginManager.setLoginBehavior('web_only');
    const {isCancelled} = await LoginManager.logInWithPermissions([
      'email',
      'public_profile',
    ]);
    if (isCancelled) throw new Error('Cancelled');
    else {
      const {accessToken} = await AccessToken.getCurrentAccessToken();
      const token = auth.FacebookAuthProvider.credential(accessToken);
      return token;
    }
  };

  logoutWithFacebook = () => LoginManager.logOut();

  logInWithgoogle = async () => {
    const hasPlayService = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    if (!hasPlayService) throw new Error('play services not available');
    const isSignIn = await GoogleSignin.isSignedIn();
    if (isSignIn) await this.logOutWithGoogle();
    const {idToken} = await GoogleSignin.signIn();
    const token = auth.GoogleAuthProvider.credential(idToken);
    return token;
  };

  logOutWithGoogle = async () => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    console.log('logOutWithGoogle');
  };

  logInWithapple = async () => {
    if (!appleAuth.isSupported)
      throw new Error(
        'AppleAuth is not supported on the device. Currently Apple Authentication works on iOS devices running iOS 13 or later',
      );
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    if (!appleAuthRequestResponse.identityToken)
      throw new Error('Apple Sign-In failed - no identify token returned');

    const {
      identityToken,
      nonce,
      fullName: {givenName, familyName},
    } = appleAuthRequestResponse;
    const token = auth.AppleAuthProvider.credential(identityToken, nonce);
    return {token, name: `${givenName || ''} ${familyName || ''}`};
  };
}

export default new SocialLogin();
