import React, {useState} from 'react';
import {Share, ScrollView, Platform, Alert} from 'react-native';
import VersionInfo from 'react-native-version-info';
import PageHeading from '@/components/PageHeading';
import {normal} from '@/Assets/lottie';
import SafeView from '@/components/SafeView';
import BarButton from '@/components/BarButton';
import InAppBrowser from '@/services/InAppBrowser';
import * as Images from '@/Assets/Images';
import {useDispatch} from 'react-redux';
import {playMusic} from '@/store/actions/music-action';
import {getValue, storeValue} from '@/services/storage';
import AnimatedBackground from '@/components/AnimatedBackground';
import API from '@/services/API';
import {store} from '@/store/store';
import {logOutUser} from '@/store/actions/auth-action';

const playStoreUrl =
  'https://play.google.com/store/apps/details?id=com.hypnocloud.relaxandletgo&hl=en&gl=US';
const appStoreUrl =
  'https://apps.apple.com/us/app/hypnocloud-hypnotherapy-app/id1450270910';

const backgroundImage = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  resizeMode: 'contain',
};
const Settings = ({navigation}) => {
  const [active, setActive] = useState(getValue('background') == 'true');
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(playMusic({appMusic: !active}));
    storeValue('background', `${!active}`);
    setActive(!active);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: Platform.select({android: playStoreUrl, ios: appStoreUrl}),
        title: 'Believe App',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const {Auth} = store.getState();
  const confirmDeleteAccount = () => {
    Alert.alert(
      'Delete Alert',
      'Are you sure that you want to delete your account',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteAccount()},
      ],
    );
  };
  const deleteAccount = async () => {
    try {
      const {ok} = await API.delete('/delete-account');
      if (ok) dispatch(logOutUser());
    } catch (error) {}
  };
  return (
    <AnimatedBackground animation={normal}>
      <SafeView>
        <PageHeading {...{title: 'Settings', navigation, backButton: true}} />

        <ScrollView
          contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 20}}>
          <BarButton
            {...{
              title: 'Delete Account',
              icon: Images.deleteaccount,
              onPress: () => confirmDeleteAccount(),
            }}
          />

          <BarButton
            {...{
              title: 'Change Password',
              icon: Images.changepass,
              onPress: () => navigation.navigate('ChangePassword'),
            }}
          />
          <BarButton
            {...{
              title: 'Share',
              icon: Images.shareapp,
              onPress: onShare,
            }}
          />
          <BarButton
            {...{
              title: 'Connect',
              icon: Images.connect,
              onPress: () =>
                InAppBrowser.open('https://linktr.ee/loahypnotist'),
            }}
          />
          <BarButton
            {...{
              title: 'Background Music',
              icon: Images.appmusic,
              onPress: toggle,
              sound: true,
              active,
            }}
          />
          <BarButton
            {...{
              title: 'App Version',
              icon: Images.appversion,
              version: VersionInfo.appVersion,
            }}
          />
        </ScrollView>
      </SafeView>
    </AnimatedBackground>
  );
};

export default Settings;
