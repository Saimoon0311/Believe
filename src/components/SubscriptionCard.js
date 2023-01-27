import React from 'react';
import {Colors, FontFamily} from '@/theme/Variables';
import {Alert, Linking, Platform, StyleSheet, Text, View} from 'react-native';
import {Touchable} from './Touchable';
import API from '@/services/API';
import InAppBrowser from '@/services/InAppBrowser';

const SubscriptionCard = ({navigate, user}) => {
  const subscription_type = user.user?.user_subscription?.subscription_type;
  const isValid = Boolean(user?.user?.is_subscribed);
  const subscribeRoute = () => {
    if (!isValid) navigate('Subscription', {title: 'Subscription'});
    else manageSubscription();
    // else Alert.alert('Coming Soon');
  };

  const manageSubscription = async () => {
    try {
      const {ok, data} = await API.get('/list-web-subscription');
      if (ok && data?.subscriptions?.length) {
        const {platform, product_id} = data?.subscriptions[0];
        if (platform == Platform.OS) {
          if (Platform.OS == 'ios')
            Linking.openURL('https://apps.apple.com/account/subscriptions');
          else
            Linking.openURL(
              `https://play.google.com/store/account/subscriptions?package=com.anideos.believe&sku=${product_id}`,
            );
        } else
          InAppBrowser.open(
            `https://believe-website.staginganideos.com/subscription-mob/${user.token}`,
          );
      }
    } catch (error) {
      console.log('manageSubscription', error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Subscription</Text>
        <Text style={styles.subHeading}>{subscription_type || 'Free'}</Text>
      </View>
      <Touchable style={styles.button} Opacity={0.7} onPress={subscribeRoute}>
        <Text style={styles.buttonText}>{!isValid ? 'Upgrade' : 'Manage'}</Text>
      </Touchable>
    </View>
  );
};

export default SubscriptionCard;

const styles = StyleSheet.create({
  container: {
    height: 85,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: Colors.fadeBlue,
  },
  heading: {
    fontSize: 20,
    paddingLeft: 10,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  subHeading: {
    fontSize: 18,
    paddingTop: 5,
    paddingLeft: 10,
    textAlign: 'left',
    color: Colors.yellow2,
    fontFamily: FontFamily.regular,
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.greenFaded,
  },
  buttonText: {
    fontSize: 12,
    color: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textTransform: 'uppercase',
    fontFamily: FontFamily.medium,
  },
});
