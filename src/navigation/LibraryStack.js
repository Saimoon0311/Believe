import React from 'react';
import {animationConfig} from '@/theme/Variables';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Screens from '../screens/Screens/Screens';

const Stack = createNativeStackNavigator();

const CommonTabScreen = ({screen}) => (
  <Stack.Navigator screenOptions={animationConfig}>
    <Stack.Screen
      name={screen}
      component={Screens[screen.replace('Stack', '')]}
    />
    <Stack.Screen name="Goals" component={Screens.Goals} />
    <Stack.Screen name="LibraryDetails" component={Screens.LibraryDetails} />
    <Stack.Screen name="VideoDetails" component={Screens.VideoDetails} />
    <Stack.Screen name="ViewAll" component={Screens.ViewAll} />
    <Stack.Screen name="ReminderDetail" component={Screens.ReminderDetail} />
    <Stack.Screen name="Reminders" component={Screens.Reminders} />
    <Stack.Screen name="Settings" component={Screens.Settings} />
    <Stack.Screen name="SessionSelect" component={Screens.SessionSelect} />
    <Stack.Screen name="SoundSelect" component={Screens.SoundSelect} />
    <Stack.Screen
      name="BackgroundSelect"
      component={Screens.BackgroundSelect}
    />
    <Stack.Screen name="EditProfile" component={Screens.EditProfile} />
    <Stack.Screen name="Notifications" component={Screens.Notifications} />
    <Stack.Screen name="Statistics" component={Screens.Statistics} />
    <Stack.Screen name="Badges" component={Screens.Badges} />
    <Stack.Screen name="Wallet" component={Screens.Wallet} />
    <Stack.Screen name="Favorites" component={Screens.Favorites} />
    <Stack.Screen name="Playlist" component={Screens.Playlist} />
    {/* <Stack.Screen name="EditPlaylist" component={Screens.EditPlaylist} />
    <Stack.Screen name="PlayListEdit" component={Screens.PlayListEdit} /> */}
    <Stack.Screen name="Downloads" component={Screens.Downloads} />
    <Stack.Screen name="Courses" component={Screens.Courses} />
    <Stack.Screen name="Scripts" component={Screens.Scripts} />
    <Stack.Screen name="ScriptDetails" component={Screens.ScriptDetails} />
    <Stack.Screen name="Series" component={Screens.Series} />
    <Stack.Screen name="SeriesDetails" component={Screens.SeriesDetails} />
    <Stack.Screen name="EBooks" component={Screens.EBooks} />
    <Stack.Screen name="CourseDetail" component={Screens.CourseDetail} />
    <Stack.Screen name="ReadContent" component={Screens.ReadContent} />
    <Stack.Screen name="DownloadContent" component={Screens.DownloadContent} />
    <Stack.Screen name="Reviews" component={Screens.Reviews} />
    <Stack.Screen name="Affiliate" component={Screens.Affiliate} />
    <Stack.Screen
      name="AffiliateReferral"
      component={Screens.AffiliateReferral}
    />
    <Stack.Screen name="Browser" component={Screens.Browser} />
    <Stack.Screen name="ProfileSettings" component={Screens.ProfileSettings} />
    <Stack.Screen name="ChangePassword" component={Screens.ChangePassword} />
    <Stack.Screen name="SearchingData" component={Screens.SearchingData} />
  </Stack.Navigator>
);

export default React.memo(CommonTabScreen);
