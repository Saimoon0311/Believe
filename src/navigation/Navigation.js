import React, {Fragment, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import * as Screens from '../screens/Screens/Screens';
import MainTabScreen from './MainTabScreen';
import OnboardStack from './OnboardStack';
import useReduxStore from '@/hooks/useReduxStore';
import {animationConfig} from '@/theme/Variables';
import NavigationService from '@/services/NavigationService';
import branch from 'react-native-branch';
import {Platform} from 'react-native';

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

// const linking = {
//   // Custom susbcription to handle incoming links
//   subscribe(listener) {
//     branch.subscribe(async ({error, params, ...rest}) => {
//       console.log('error, params, ...rest', error, params, rest);
//       if (error) {
//         console.error('Error from Branch: ' + error);
//         return;
//       }

//       let lastParams = await branch.getLatestReferringParams(); // params from last open
//       let installParams = await branch.getFirstReferringParams(); // params from original install
//       console.log('lastParams', lastParams, installParams);
//       if (params['+non_branch_link']) {
//         const nonBranchUrl = params['+non_branch_link'];
//         // Route non-Branch URL if appropriate.
//         console.log('nonBranchUrl', nonBranchUrl);
//         return;
//       }

//       if (!params['+clicked_branch_link']) {
//         // Indicates initialization success and some other conditions.
//         // No link was opened.
//         return;
//       }

//       // A Branch link was opened
//       const url = params.$canonical_url;

//       listener(url);
//     });

//     return () => {
//       // Clean up the event listeners
//       console.log('Clean up the event listeners');
//     };
//   },
//   // Options such as prefixes, screens config etc.
//   // ...
// };

const Navigation = ({isLogin, onBoard}) => {
  const {getState} = useReduxStore();
  const {user} = getState('Auth');
  // const isIntro = Boolean(user?.onboard_pass == 'false');
  const isAppIntro = Boolean(onBoard == 'true');
  useEffect(() => {
    if (NavigationService.ref && !user?.is_subscribed && isLogin)
      NavigationService.navigate('Subscription');

    let timOutRef = null;
    branch.subscribe(async ({error, params, ...rest}) => {
      if (
        Platform.OS == 'android' &&
        !NavigationService.ref &&
        params['+clicked_branch_link']
      )
        timOutRef = setTimeout(() => {
          NavigationService.navigate(
            'MusicPlayer',
            JSON.parse(params?.content_data),
          );
        }, 4000);
      else if (params['+clicked_branch_link'] && NavigationService.ref) {
        NavigationService.navigate(
          'MusicPlayer',
          JSON.parse(params?.content_data),
        );
      }

      return () => {
        console.log('timOutRef', timOutRef);
        clearTimeout(timOutRef);
      };
    });
  }, [NavigationService.ref]);

  return (
    <SafeAreaProvider
      style={{backgroundColor: 'black'}}
      initialMetrics={initialWindowMetrics}>
      <NavigationContainer
        // linking={linking}
        ref={ref => NavigationService.setRef(ref)}>
        <Stack.Navigator screenOptions={animationConfig}>
          {isLogin && (
            <Stack.Group>
              <Stack.Screen name="MainTabScreen" component={MainTabScreen} />
              <Stack.Screen
                name="VideoPlayScreen"
                component={Screens.VideoPlayScreen}
              />
              <Stack.Screen
                name="MusicPlayer"
                component={Screens.MusicPlayer}
              />
              <Stack.Screen
                name="VideoContent"
                component={Screens.VideoContent}
              />
              <Stack.Screen
                name="AudioContent"
                component={Screens.AudioContent}
              />
              <Stack.Screen
                name="PlaylistDetails"
                component={Screens.PlaylistDetails}
              />
              <Stack.Screen
                name="SessionTimer"
                component={Screens.SessionTimer}
              />
              <Stack.Screen
                name="EditPlaylist"
                component={Screens.EditPlaylist}
              />
              <Stack.Screen
                name="AddPlayListData"
                component={Screens.AddPlayListData}
              />
              <Stack.Screen
                name="PlayListEdit"
                component={Screens.PlayListEdit}
              />
              <Stack.Screen
                name="SortPlaylist"
                component={Screens.SortPlaylist}
              />
              <Stack.Screen
                name="Congratulations"
                component={Screens.Congratulations}
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
              />
              <Stack.Screen
                name="Subscription"
                component={Screens.Subscription}
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
              />
              <Stack.Screen name="Thankyou" component={Screens.Thankyou} />
            </Stack.Group>
          )}

          {!isLogin && (
            <Stack.Group>
              {!isAppIntro && (
                <Fragment>
                  <Stack.Screen
                    name="Onboarding"
                    component={Screens.Onboarding}
                  />
                  <Stack.Screen name="Welcome" component={Screens.Welcome} />
                </Fragment>
              )}

              <Stack.Screen name="Login" component={Screens.Login} />
              <Stack.Screen name="Register" component={Screens.Register} />
              <Stack.Screen name="Forget" component={Screens.Forget} />
              <Stack.Screen
                name="Verification"
                component={Screens.Verification}
              />
              <Stack.Screen
                name="NewPassword"
                component={Screens.NewPassword}
              />
              <Stack.Screen name="Update" component={Screens.Update} />
              <Stack.Screen name="OnboardStack" component={OnboardStack} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;
