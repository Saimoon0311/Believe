// import React, {Fragment} from 'react';
// import {View, Text, ScrollView, ImageBackground} from 'react-native';
// import {subscription, checked} from '@/Assets/Images';
// // import PageHeading from '@/components/PageHeading';
// import useSubscription from './useSubscription';
// import SafeView from '@/components/SafeView';
// import BadgeCard from '@/components/BadgeCard';
// import NextButton from '@/components/NextButton';
// import SubscribeCard from '@/components/SubscribeCard';
// import {styles} from './styles';
// import {generateSubViewObject} from '@/utils/helper';
// import SubscribeOffer from './subscribeOffer';

// const yearlyPackages = ['29102022138', '25102022653'];

// const Subscription = ({navigation, route}) => {
//   const {
//     plan,
//     user,
//     data,
//     marked,
//     connected,
//     subscriptions,
//     showPlan,
//     setMarked,
//     openPaymentSheet,
//     onBackHandler,
//   } = useSubscription(navigation, route);

//   const yearlyPkg = subscriptions?.filter(
//     sub => generateSubViewObject(sub)?.packageTitle == 'Yearly',
//   )[0];
//   const monthlyPkg = subscriptions?.filter(
//     sub => generateSubViewObject(sub)?.packageTitle == 'Monthly',
//   )[0];
//   return (
//     <ImageBackground source={subscription} style={styles.backgroundImage}>
//       <SafeView>
//         <Text
//           onPress={onBackHandler}
//           style={[
//             styles.heading,
//             {textAlign: 'right', marginRight: 40, marginVertical: 10},
//           ]}>
//           X
//         </Text>
//         <ScrollView
//           contentContainerStyle={styles.container}
//           showsVerticalScrollIndicator={false}>
//           {plan ? (
//             <Fragment>
//               <Text style={[styles.heading, {fontSize: 35}]}>
//                 Unlock Believe Premium FREE!
//               </Text>
//               <View style={styles.mainContainer}>
//                 <View style={styles.badgeBox}>
//                   <BadgeCard
//                     {...{
//                       title: 'Speed Up Your Manifestations',
//                       icon: checked,
//                     }}
//                   />

//                   <BadgeCard
//                     {...{
//                       title: 'Access to 1000 + Powerful LOA Hypnosis Audios',
//                       icon: checked,
//                     }}
//                   />
//                   <BadgeCard
//                     {...{
//                       title: 'Members Only Personal Growth Courses',
//                       icon: checked,
//                     }}
//                   />
//                   <BadgeCard
//                     {...{
//                       title: 'Videos, Scripts, Live Events + Much More',
//                       icon: checked,
//                     }}
//                   />
//                   <BadgeCard
//                     {...{
//                       title: `Start Living a Happier, More Abundant Life Now`,
//                       icon: checked,
//                     }}
//                   />
//                 </View>
//               </View>
//               <Text style={styles.planHeading}>Select Your Plan</Text>
//               <Text
//                 style={[
//                   styles.planHeading,
//                   {marginVertical: 0, textAlign: 'left', fontSize: 16},
//                 ]}>
//                 Best Value
//               </Text>
//               <View
//                 style={{flexDirection: 'row', marginTop: 10, marginBottom: 20}}>
//                 <SubscribeCard
//                   {...{
//                     item: yearlyPkg,
//                     marked,
//                     onPress: setMarked,
//                     title: 'Annual - Billed \nat',
//                     trial: '14 Days free',
//                     discount: yearlyPkg?.discountPrice,
//                   }}
//                 />
//                 <SubscribeCard
//                   {...{
//                     item: monthlyPkg,
//                     onPress: setMarked,
//                     marked,
//                     title: 'Monthly payment',
//                     // trial: '11.99/month',
//                   }}
//                 />
//               </View>
//               <View style={[styles.bottom, {flexDirection: 'column'}]}>
//                 <Text
//                   style={[
//                     styles.cancelHeading,
//                     {
//                       opacity: yearlyPackages.includes(marked?.productId)
//                         ? 1
//                         : 0,
//                     },
//                   ]}>
//                   {`14 day free trial then ${
//                     generateSubViewObject(yearlyPkg).price
//                   } / year. \n Cancel anytime`}
//                 </Text>
//                 <NextButton
//                   disabled={!Boolean(connected && marked?.productId)}
//                   onPress={openPaymentSheet}
//                   buttonTitle="Continue"
//                 />
//               </View>
//             </Fragment>
//           ) : (
//             <SubscribeOffer
//               showPlan={showPlan}
//               price={generateSubViewObject(yearlyPkg).price}
//               onContinue={openPaymentSheet}
//             />
//           )}
//         </ScrollView>
//       </SafeView>
//     </ImageBackground>
//   );
// };

// export default React.memo(Subscription);

import {View, Text, ScrollView, ImageBackground, Platform} from 'react-native';
import React, {Component, Fragment} from 'react';
import {
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  flushFailedPurchasesCachedAsPendingAndroid,
  clearTransactionIOS,
  requestSubscription,
  getSubscriptions,
  finishTransaction,
} from 'react-native-iap';
import * as Images from '@/Assets/Images';
import {showError, showSuccess} from '@/services/SnackBar';
import {getUser, updateAuth} from '@/store/actions/auth-action';
import SafeView from '@/components/SafeView';
import BadgeCard from '@/components/BadgeCard';
import NextButton from '@/components/NextButton';
import SubscribeCard from '@/components/SubscribeCard';
import {styles} from './styles';
import {generateSubViewObject} from '@/utils/helper';
import SubscribeOffer from './subscribeOffer';
import API from '@/services/API';

const yearlyPackages = ['29102022138', '29102022152'];

import {store} from '@/store/store';
const skus = Platform.select({
  ios: {skus: ['29102022138', '2510202248']},
  android: {skus: ['25102022653', '29102022152', '29102022200']},
});

class Subscriptions extends Component {
  state = {subscription: [], marked: {}, plan: false};
  componentDidMount() {
    initConnection().then(async () => {
      try {
        await this.clearTransaction();
        const subs = await getSubscriptions(skus);
        console.log('subs', subs);
        this.setState({
          subscription: subs,
          marked: subs.filter(
            sub => generateSubViewObject(sub)?.packageTitle == 'Yearly',
          )[0],
        });
        this.purchaseUpdateSubscription = purchaseUpdatedListener(
          async purchase => {
            try {
              // console.log('purchaseUpdateSubscription', purchase);
              const receipt = purchase?.transactionReceipt;
              if (receipt) {
                const {data, ok} = await API.post('/validate-receipt', {
                  platform: Platform.OS,
                  payload: purchase,
                });
                if (ok) {
                  store.dispatch(getUser());
                  if (Platform.OS == 'ios')
                    await finishTransaction({purchase, isConsumable: true});
                  showSuccess(data?.message);
                  this.onBackHandler();
                } else showError(data?.message);
              }
            } catch (error) {
              showError(error?.message);
            } finally {
              store.dispatch(updateAuth({loading: false}));
            }
          },
        );

        this.purchaseErrorSubscription = purchaseErrorListener(error => {
          console.warn('purchaseErrorListener', error);
        });
      } catch (error) {
        console.log(error, 'initConnection error');
      }
    });
  }

  componentWillUnmount() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }

    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
  }

  subscribe = async () => {
    try {
      const {marked} = this.state;
      if (!marked?.productId) return;
      store.dispatch(updateAuth({loading: true}));
      const {productId: sku, subscriptionOfferDetails} = marked;
      const isAndroid =
        subscriptionOfferDetails?.length && Platform.OS == 'android';
      await requestSubscription({
        sku,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
        ...(isAndroid && {
          subscriptionOffers: [
            {sku, offerToken: subscriptionOfferDetails[0]?.offerToken},
          ],
        }),
      });
    } catch (err) {
      store.dispatch(updateAuth({loading: false}));
      if (
        err?.message !==
        'The operation couldn’t be completed. (SKErrorDomain error 2.)'
      )
        showError(err?.message);
      console.log('openPaymentSheet err', err?.message);
    }
  };

  clearTransaction = async () => {
    if (Platform.OS == 'ios') await clearTransactionIOS();
    else flushFailedPurchasesCachedAsPendingAndroid();
  };

  onBackHandler = () => {
    const {navigation, route} = this.props;
    const {params} = route;
    const {user} = store.getState(state => state.Auth);
    if (params?.isSignUp && !user?.user?.is_subscribed)
      navigation.replace('Thankyou', params);
    else navigation.goBack();
  };

  setMarkHandler = subItem => {
    if (subItem?.productId !== this.state.marked?.productId)
      this.setState({marked: subItem});
    else this.setState({marked: {}});
  };

  render() {
    const {subscription, marked, plan} = this.state;
    const yearlyPkg = subscription?.filter(
      sub => generateSubViewObject(sub)?.packageTitle == 'Yearly',
    )[0];
    const monthlyPkg = subscription?.filter(
      sub => generateSubViewObject(sub)?.packageTitle == 'Monthly',
    )[0];
    return (
      <ImageBackground
        source={Images.subscription}
        style={styles.backgroundImage}>
        <SafeView>
          <Text
            onPress={this.onBackHandler}
            style={[
              styles.heading,
              {textAlign: 'right', marginRight: 40, marginVertical: 10},
            ]}>
            X
          </Text>
          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>
            {plan ? (
              <Fragment>
                <Text style={[styles.heading, {fontSize: 35}]}>
                  Unlock Believe Premium FREE!
                </Text>
                <View style={styles.mainContainer}>
                  <View style={styles.badgeBox}>
                    <BadgeCard
                      {...{
                        title: 'Speed Up Your Manifestations',
                        icon: Images.checked,
                      }}
                    />

                    <BadgeCard
                      {...{
                        title: 'Access to 1000 + Powerful LOA Hypnosis Audios',
                        icon: Images.checked,
                      }}
                    />
                    <BadgeCard
                      {...{
                        title: 'Members Only Personal Growth Courses',
                        icon: Images.checked,
                      }}
                    />
                    <BadgeCard
                      {...{
                        title: 'Videos, Scripts, Live Events + Much More',
                        icon: Images.checked,
                      }}
                    />
                    <BadgeCard
                      {...{
                        title: `Start Living a Happier, More Abundant Life Now`,
                        icon: Images.checked,
                      }}
                    />
                  </View>
                </View>
                <Text style={styles.planHeading}>Select Your Plan</Text>
                <Text
                  style={[
                    styles.planHeading,
                    {marginVertical: 0, textAlign: 'left', fontSize: 16},
                  ]}>
                  Best Value
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 20,
                  }}>
                  <SubscribeCard
                    {...{
                      item: yearlyPkg,
                      marked,
                      onPress: this.setMarkHandler,
                      title: 'Annual - Billed \nat',
                      trial: '14 Days free',
                      discount: yearlyPkg?.discountPrice,
                    }}
                  />
                  <SubscribeCard
                    {...{
                      item: monthlyPkg,
                      onPress: this.setMarkHandler,
                      marked,
                      title: 'Monthly payment',
                      // trial: '11.99/month',
                    }}
                  />
                </View>
                <View style={[styles.bottom, {flexDirection: 'column'}]}>
                  <Text
                    style={[
                      styles.cancelHeading,
                      {
                        opacity: yearlyPackages.includes(marked?.productId)
                          ? 1
                          : 0,
                      },
                    ]}>
                    {`14 day free trial then ${
                      generateSubViewObject(yearlyPkg).price
                    } / year. \n Cancel anytime`}
                  </Text>
                  <NextButton
                    disabled={!Boolean(marked?.productId)}
                    onPress={this.subscribe}
                    buttonTitle="Continue"
                  />
                </View>
              </Fragment>
            ) : (
              <SubscribeOffer
                showPlan={() => this.setState({plan: true})}
                price={generateSubViewObject(yearlyPkg).price}
                onContinue={this.subscribe}
              />
            )}
          </ScrollView>
        </SafeView>
      </ImageBackground>
    );
  }
}

export default Subscriptions;
