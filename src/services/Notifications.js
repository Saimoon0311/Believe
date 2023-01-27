import {Alert, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  EventType,
  AndroidLaunchActivityFlag,
} from '@notifee/react-native';
import {requestNotifications, openSettings} from 'react-native-permissions';
import NavigationService from './NavigationService';
const sound = Platform.select({ios: 'interval.wav', android: 'interval.mp3'});
const onNotificationNotiFee = async (data, appState) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound,
  });

  // Display a notification
  notifee.displayNotification({
    ...data.notification,
    android: {
      channelId,
      ...data.notification.android,
      pressAction: {
        id: 'default',
        launchActivity: 'default',
        launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
      },
      sound,
    },
    ios: {sound},
  });
  const isActive = Boolean(NavigationService.ref && appState == 'active');
  const notificationObj = JSON.parse(data.data.payload);
  if (isActive && notificationObj?.notification_type == 'badge_unlocked') {
    NavigationService.navigate('Congratulations', notificationObj || {});
  }
};

class FCMService {
  register = (onRegister, onOpenNotification, appState) => {
    this.checkPermission(onRegister);
    this.createNoitificationListeners(onRegister, onOpenNotification, appState);
  };

  checkPermission = async onRegister => {
    try {
      const authStatus = await messaging().hasPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) this.getToken(onRegister);
      else this.requestPermission(onRegister);
    } catch (error) {
      console.log(error);
    }
  };

  getToken = onRegister =>
    messaging()
      .getToken()
      .then(res => onRegister(res));

  requestPermission = async onRegister => {
    try {
      const {status} = await requestNotifications(['alert', 'sound', 'badge']);
      if (status === 'granted') this.getToken(onRegister);
      else {
        Alert.alert(
          'Warning',
          `Push notifications have been ${status}. You will not receive any important notification unless enabled from settings.`,
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Open Setting',
              onPress: () => {
                openSettings().catch(() =>
                  console.warn('Cannot open settings'),
                );
              },
            },
          ],
        );
      }
    } catch (error) {
      console.log('Requested persmission rejected ', error);
    }
  };

  deletedToken = () => {
    messaging()
      .deleteToken()
      .catch(error => {
        console.log('Delected token error ', error);
      });
  };

  createNoitificationListeners = (onRegister, onOpenNotification, appState) => {
    // Triggered  when a particular  notification  has been recevied in foreground
    this.notificationListener = messaging().onMessage(
      data => onNotificationNotiFee(data, appState),
      // {
      //   if (NavigationService.ref && appState == 'active') {
      //     NavigationService.navigate(
      //       'Congratulations',
      //       JSON.parse(data.data.payload) || {},
      //     );
      //   }
      // },
    );

    // If your app is backgound, you can listen for when a
    //notification is clicked / tapped / opened as follows
    this.notificationOpenedListener = messaging().onNotificationOpenedApp(
      notification => {
        // console.log(notification);
        if (notification) onOpenNotification(notification);
        // this.removeDelieveredNotification(notification);
      },
    );

    // if your app is closed, you can check if  it was opened by notification
    // being  clicked / tapped / opened as follows
    messaging()
      .getInitialNotification()
      .then(notification => {
        if (notification) onOpenNotification(notification);
        // this.removeDelieveredNotification(notification);
      });

    // Triggered when have  new token
    this.onTokenRefreshListener = messaging().onTokenRefresh(onRegister);

    this.forgroundListener = notifee.onForegroundEvent(
      async ({type, detail}) => {
        const {notification} = detail;
        const isPressed = Boolean(
          type === EventType.ACTION_PRESS || type == EventType.PRESS,
        );
        if (isPressed) onOpenNotification(notification);
        if (type !== 7) await this.setBadge();
      },
    );
    this.backgroundListner = notifee.onBackgroundEvent(
      async ({type, detail}) => {
        const {notification} = detail;
        const isPressed = Boolean(
          type === EventType.ACTION_PRESS || type == EventType.PRESS,
        );
        if (isPressed) onOpenNotification(notification);
        if (type !== 7) await this.setBadge();
      },
    );
  };
  setBadge = (badge = 0) => notifee.setBadgeCount(badge);
  unRegister = () => {
    this.notificationListener();
    this.notificationOpenedListener();
    this.onTokenRefreshListener();
    this.forgroundListener();
    this.deletedToken();
    console.log('FCMService unRegister successfully');
  };
}

export const fcmService = new FCMService();
