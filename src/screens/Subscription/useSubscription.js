import {useState, useEffect, useRef} from 'react';
import {Platform, Linking} from 'react-native';
import {showError, showSuccess} from '@/services/SnackBar';
import {getUser, updateAuth} from '@/store/actions/auth-action';
import API from '@/services/API';
import useReduxStore from '@/hooks/useReduxStore';
import {
  useIAP,
  endConnection,
  initConnection,
  clearTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
  flushFailedPurchasesCachedAsPendingAndroid,
} from 'react-native-iap';
import {generateSubViewObject} from '@/utils/helper';

const skus = Platform.select({
  ios: {skus: ['29102022138', '2510202248']},
  android: {skus: ['25102022653', '29102022152', '29102022200']},
});
const useSubscription = (navigation, {params}) => {
  const [marked, setMarked] = useState({});
  const [plan, setPlan] = useState(false);
  const {dispatch, getState} = useReduxStore();
  const {user} = getState('Auth');

  const purchaseUpdateSubscription = useRef(null);
  const purchaseErrorSubscription = useRef(null);
  const {
    connected,
    subscriptions,
    getSubscriptions,
    requestSubscription,
    finishTransaction,
  } = useIAP();

  const openPaymentSheet = async () => {
    try {
      if (!marked?.productId) return;
      dispatch(updateAuth({loading: true}));
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
      dispatch(updateAuth({loading: false}));
      if (
        err?.message !==
        'The operation couldn’t be completed. (SKErrorDomain error 2.)'
      )
        showError(err?.message);
      console.log('openPaymentSheet err', err?.message);
    }
  };

  useEffect(() => {
    if (connected)
      initConnection()
        .then(async () => {
          dispatch(updateAuth({loading: true}));
          await getSubscriptions(skus);
          if (Platform.OS == 'android')
            await flushFailedPurchasesCachedAsPendingAndroid();
          else await clearTransactionIOS();
          dispatch(updateAuth({loading: false}));
        })
        .catch(err => dispatch(updateAuth({loading: false})));
    purchaseUpdateSubscription.current = purchaseUpdatedListener(
      purchaseUpdateSubscriptionListner,
    );
    purchaseErrorSubscription.current = purchaseErrorListener(error => {
      dispatch(updateAuth({loading: false}));
      showError(error?.message);
    });
    return () => {
      if (connected)
        endConnection()
          .then(res => console.log('endConnection success'))
          .catch(err => console.log('endConnection error', err));

      if (purchaseUpdateSubscription.current) {
        purchaseUpdateSubscription.current?.remove();
        purchaseUpdateSubscription.current = null;
      }

      if (purchaseErrorSubscription.current) {
        purchaseErrorSubscription.current?.remove();
        purchaseErrorSubscription.current = null;
      }
    };
  }, []);
  const purchaseUpdateSubscriptionListner = async purchase => {
    // try {
    //   console.log('purchaseUpdateSubscriptionListner payload', payload);
    //   if (payload) {
    //     const {data, ok} = await API.post('/validate-receipt', {
    //       platform: Platform.OS,
    //       payload,
    //     });
    //     console.log('purchaseUpdateSubscriptionListner data', data, ok);
    //     if (ok) {
    //       dispatch(getUser());
    //       navigation?.goBack();
    //     }
    //     showSuccess(data?.message);
    //   }
    // } catch (error) {
    //   showError(error?.message);
    //   console.log('purchaseUpdateSubscriptionListner error', error);
    // } finally {
    //   dispatch(updateAuth({loading: false}));
    // }
    try {
      console.log('purchaseUpdatedListener', purchase);
      const receipt = purchase?.transactionReceipt;
      console.log('purchase?.transactionReceipt', purchase?.transactionReceipt);
      if (receipt) {
        const {data, ok} = await API.post('/validate-receipt', {
          platform: Platform.OS,
          payload: purchase,
        });
        console.log(
          'purchaseUpdateSubscriptionListner data',
          data,
          ok,
          purchase,
        );
        if (ok) {
          dispatch(getUser());
          await finishTransaction({purchase, isConsumable: true});
          showSuccess(data?.message);
          onBackHandler();
        } else showError(data?.message);
      }
    } catch (error) {
      showError(error?.message);
      console.log('purchaseUpdateSubscriptionListner error', error);
    } finally {
      dispatch(updateAuth({loading: false}));
    }
  };

  const cancelSubscription = () => {
    if (Platform.OS == 'ios')
      Linking.openURL('https://apps.apple.com/account/subscriptions');
    else
      Linking.openURL(
        `https://play.google.com/store/account/subscriptions?package=com.anideos.believe&sku=${marked?.productId}`,
      );
  };

  const setMarkHandler = subItem => {
    if (subItem?.productId !== marked?.productId) setMarked(subItem);
    else setMarked({});
  };

  useEffect(() => {
    setMarked(
      subscriptions.filter(
        sub => generateSubViewObject(sub)?.packageTitle == 'Yearly',
      )[0],
    );
  }, [subscriptions]);

  const showPlan = () => setPlan(!plan);

  const onBackHandler = () => {
    if (params?.isSignUp) navigation.replace('Thankyou', params);
    else navigation.goBack();
  };
  console.log(params, 'useSub');
  return {
    plan,
    user,
    showPlan,
    marked,
    connected,
    data: params,
    subscriptions,
    openPaymentSheet,
    cancelSubscription,
    setMarked: setMarkHandler,
    onBackHandler,
  };
};

export default useSubscription;
