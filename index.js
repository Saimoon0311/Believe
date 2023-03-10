/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from '@/store/store';
import TrackPlayer from 'react-native-track-player';
import {MenuProvider} from 'react-native-popup-menu';

const Believe = () => (
  <Provider store={store}>
    <MenuProvider>
      <App />
    </MenuProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Believe);
TrackPlayer.registerPlaybackService(() => require('@/services/Services'));
