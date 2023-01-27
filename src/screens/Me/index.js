import React, {useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import * as Images from '@/Assets/Images';
import useMe from './useMe';
import {normal} from '@/Assets/lottie';
import SubscriptionCard from '@/components/SubscriptionCard';
import BarButton from '@/components/BarButton';
import SimpleButton from '@/components/SimpleButton';
import SafeView from '@/components/SafeView';
import {styles} from './styles';
import Header from './Header';
import InAppBrowser from '@/services/InAppBrowser';
import PageHeading from '@/components/PageHeading';
import AnimatedBackground from '@/components/AnimatedBackground';
const about = 'https://staginganideos.com/Believe-Backend/about-believe/';
const privacy = 'https://believe-website.staginganideos.com/privacypolicy';
const terms = 'https://believe-website.staginganideos.com/termsandconditions';
const faq = 'http://virtualrealitycreators.com/Believe-Backend/faqs';

const Me = ({navigation, route}) => {
  const {user, logOutHandler, helpRoute, triggerReview, deleteDownloads} =
    useMe(navigation);
  const {navigate} = navigation;

  return (
    <AnimatedBackground animation={normal}>
      <SafeView>
        <View style={styles.container}>
          <PageHeading backButton={false} title="My Profile" />
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <Header {...{user: user.user}} />
            <View style={{paddingTop: 10}}>
              <Text style={styles.content}>General Settings</Text>
              <View style={{paddingTop: 10, paddingBottom: 20}}>
                <SubscriptionCard {...{navigate, user}} />
              </View>

              <BarButton
                {...{
                  title: 'Edit Profile',
                  icon: Images.newEdit,
                  onPress: () =>
                    navigate('EditProfile', {title: 'Edit Profile'}),
                }}
              />
              <BarButton
                {...{
                  title: 'Settings',
                  icon: Images.settings,
                  onPress: () => navigate('ProfileSettings'),
                }}
              />
              <BarButton
                {...{
                  title: 'Notifications',
                  icon: Images.notifications,
                  onPress: () =>
                    navigate('Notifications', {title: 'Notifications'}),
                }}
              />
              {/* <BarButton
                {...{
                  title: 'Rate/Review',
                  icon: Images.ratereview,
                  onPress: triggerReview,
                }}
              /> */}
              <BarButton
                {...{
                  title: 'Statistics',
                  icon: Images.stats,
                  onPress: () => navigate('Statistics', {title: 'My Stats'}),
                }}
              />

              <BarButton
                {...{
                  title: 'Goals',
                  icon: Images.flag,
                  onPress: () =>
                    navigate('Goals', {
                      title: 'Set Your Goal',
                      description: 'What do you want to do Today!',
                      post: '/update-goals',
                      get: '/user-goals',
                    }),
                }}
              />
              <BarButton
                {...{
                  title: 'Earned Badges',
                  icon: Images.award,
                  onPress: () => navigate('Badges', {title: 'Badges'}),
                }}
              />
              {/* <BarButton
                {...{
                  title: 'Wallet',
                  icon: Images.wallet,
                  onPress: () => {},
                  // onPress: () => navigate('Wallet', {title: 'Wallet'}),
                }}
              /> */}
              <BarButton
                {...{
                  title: 'Recent',
                  icon: Images.recent,
                  onPress: () =>
                    navigate('ViewAll', {
                      title: 'Recently Played',
                      requestParam: 'all-recently-played',
                    }),
                }}
              />
              <BarButton
                {...{
                  title: 'Favorites',
                  icon: Images.favorites,
                  onPress: () => navigate('Favorites', {title: 'Favorites'}),
                }}
              />
              <BarButton
                {...{
                  title: 'Playlist',
                  icon: Images.playlist,
                  onPress: () => navigate('Playlist'),
                }}
              />
              <BarButton
                {...{
                  title: 'Downloads',
                  icon: Images.downloads,
                  onPress: () => navigate('Downloads', {title: 'Downloads'}),
                }}
              />
              {/* <BarButton
                {...{
                  title: 'Clear Downloads',
                  icon: Images.downloads,
                  onPress: () => deleteDownloads(),
                  isArrow: false,
                }}
              /> */}
              <BarButton
                {...{
                  title: 'My Reminders',
                  icon: Images.reminders,
                  onPress: () => navigate('Reminders', {title: 'Reminders'}),
                }}
              />
              <BarButton
                {...{
                  title: 'My Events',
                  icon: Images.Event,
                  onPress: () => navigate('Event'),
                }}
              />
              <View style={{paddingVertical: 40}}>
                <BarButton
                  {...{
                    title: 'About Us',
                    icon: Images.about,
                    onPress: () => InAppBrowser.open(about),
                  }}
                />
                <BarButton
                  {...{
                    title: 'Help & Support',
                    icon: Images.help,
                    onPress: helpRoute,
                  }}
                />
                <BarButton
                  {...{
                    title: 'FAQ',
                    icon: Images.faq,
                    onPress: () => InAppBrowser.open(faq),
                  }}
                />
                <BarButton
                  {...{
                    title: 'Privacy Policy',
                    icon: Images.Privacypolicy,
                    onPress: () => InAppBrowser.open(privacy),
                  }}
                />
                <BarButton
                  {...{
                    title: 'Terms & Conditions',
                    icon: Images.terms,
                    onPress: () => InAppBrowser.open(terms),
                  }}
                />
              </View>
            </View>
            <SimpleButton
              {...{
                title: 'Logout',
                icon: Images.logout,
                onPress: logOutHandler,
              }}
            />
          </ScrollView>
        </View>
      </SafeView>
    </AnimatedBackground>
  );
};

export default React.memo(Me);
