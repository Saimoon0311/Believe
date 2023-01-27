// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import * as Screens from '../screens/Screens/Screens';
// import {bottomTabRoute, Colors} from '@/theme/Variables';

// const Tab = createBottomTabNavigator();

// const MainTabScreen = () => (
//   <Tab.Navigator
//     screenOptions={bottomTabRoute}
//     sceneContainerStyle={{backgroundColor: Colors.primaryColor}}>
//     <Tab.Screen name="Home" component={Screens.Home} />
//     <Tab.Screen name="Library" component={Screens.Library} />
//     <Tab.Screen name="Event" component={Screens.Event} />
//     <Tab.Screen name="Search" component={Screens.Search} />
//     <Tab.Screen name="Me" component={Screens.Me} />
//     {/* <Tab.Screen name="Settings" component={Screens.Settings} /> */}
//   </Tab.Navigator>
// );

// export default MainTabScreen;
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {bottomTabRoute, Colors} from '@/theme/Variables';
import CommonTabScreen from './LibraryStack';

const Tab = createBottomTabNavigator();
const HomeStack = () => <CommonTabScreen screen="HomeStack" />;
const LibraryStack = () => <CommonTabScreen screen="LibraryStack" />;

const EventStack = () => <CommonTabScreen screen="EventStack" />;

const SearchStack = () => <CommonTabScreen screen="SearchStack" />;

const MeStack = () => <CommonTabScreen screen="MeStack" />;

const MainTabScreen = () => (
  <Tab.Navigator
    screenOptions={bottomTabRoute}
    sceneContainerStyle={{backgroundColor: Colors.primaryColor}}>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Library" component={LibraryStack} />
    <Tab.Screen name="Event" component={EventStack} />
    <Tab.Screen name="Search" component={SearchStack} />
    <Tab.Screen name="Me" component={MeStack} />
  </Tab.Navigator>
);

export default React.memo(MainTabScreen);
