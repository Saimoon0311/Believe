import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {checked} from '@/Assets/Images';
import BadgeCard from '@/components/BadgeCard';
import NextButton from '@/components/NextButton';
import {styles} from './styles';
import InAppBrowser from '@/services/InAppBrowser';
import {getUser} from '@/store/actions/auth-action';
import useReduxStore from '@/hooks/useReduxStore';
const openBrowser = url => InAppBrowser.open(url);
// const openBrowser = () => Alert.alert('Will be redirect on web page');

const SubscribeOffer = ({showPlan, price, onContinue}) => {
  const {dispatch, getState} = useReduxStore();
  const {user} = getState('Auth');
  const restoreHandler = () => {
    if (Boolean(user?.is_subscribed)) dispatch(getUser());
    else Alert.alert('No active subscription available right now');
  };
  return (
    <View style={{paddingTop: '42%'}}>
      <View style={[styles.mainContainer, {flex: 1, justifyContent: 'center'}]}>
        <Text style={[styles.heading, {fontSize: 35, fontWeight: '400'}]}>
          Unlock Believe Premium FREE!
        </Text>
        <View
          style={[
            styles.badgeBox,
            {marginVertical: 0, marginVertical: 20, alignItems: 'flex-start'},
          ]}>
          <BadgeCard
            {...{
              title: 'Speed Up Your Manifestations',
              icon: checked,
            }}
          />

          <BadgeCard
            {...{
              title: 'Access 1000 + Powerful LOA Hypnosis Audios',
              icon: checked,
            }}
          />
          <BadgeCard
            {...{
              title: 'Members Only Personal Growth Courses',
              icon: checked,
            }}
          />
          <BadgeCard
            {...{
              title: 'Videos, Scripts, Live Events + Much More',
              icon: checked,
            }}
          />
          <BadgeCard
            {...{
              title: `Start Living a Happier, More Abundant Life Now`,
              icon: checked,
            }}
          />
        </View>
      </View>

      <NextButton onPress={onContinue} buttonTitle="Continue" />
      <Text style={[styles.durationText, {fontSize: 14}]}>
        {`14 day free trial then ${price} / year. \n Cancel anytime`}
      </Text>
      <View style={{width: '100%', alignItems: 'center'}}>
        <TouchableOpacity onPress={showPlan} style={styles.button}>
          <Text style={styles.durationText}>View Other Plans</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        <Text onPress={restoreHandler} style={styles.cancelHeading}>
          Restore
        </Text>
        <Text
          onPress={() =>
            openBrowser(
              'https://believe-website.staginganideos.com/termsandconditions',
            )
          }
          style={styles.cancelHeading}>
          Terms
        </Text>
        <Text
          onPress={() =>
            openBrowser(
              'https://believe-website.staginganideos.com/billingdetail',
            )
          }
          style={styles.cancelHeading}>
          Billing
        </Text>
      </View>
    </View>
  );
};

export default React.memo(SubscribeOffer);
