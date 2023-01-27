import React from 'react';
import End from './End';
import useHome from './useHome';
import Header from './Header';
import StreakSection from './streakSection';
import Footer from './Footer';
import {ScrollView, RefreshControl} from 'react-native';
import {HomeLottie} from '@/Assets/lottie';
import AnimatedBackground from '@/components/AnimatedBackground';

const Home = ({navigation}) => {
  /* Destructuring the useHome hook. */
  const {
    user,
    reminders,
    homeContent,
    onRefresh,
    viewAll,
    viewGoals,
    viewSubscription,
    viewReminders,
    viewMeditation,
    reminderDetail,
    libraryDetail,
    playAudio,
    recentAchievements,
    isSubscript,
  } = useHome(navigation);
  const isYearly = Boolean(user?.is_subscribed);
  return (
    <AnimatedBackground animation={HomeLottie}>
      <Header {...{user, navigation, ...homeContent}} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={false} />
        }>
        <StreakSection {...homeContent} />
        <Footer
          {...{
            viewGoals,
            viewReminders,
            reminderDetail,
            recentAchievements,
            playAudio,
            viewAll,
            ...homeContent,
            reminders,
          }}
        />

        <End
          {...{
            viewAll,
            viewMeditation,
            libraryDetail,
            playAudio,
            isYearly,
            viewSubscription,
            isSubscript,
            ...homeContent,
          }}
        />
      </ScrollView>
      {/* <FlatList
          // data={data}
          refreshing={false}
          onRefresh={onRefresh}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <Bottom {...homeContent} />
              <Footer
                {...{
                  viewGoals,
                  viewReminders,
                  reminderDetail,
                  playAudio,
                  viewAll,
                  ...homeContent,
                  reminders,
                }}
              />

              <End
                {...{
                  viewAll,
                  viewMeditation,
                  libraryDetail,
                  playAudio,
                  isYearly,
                  viewSubscription,
                  ...homeContent,
                }}
              />
            </>
          }
        /> */}
    </AnimatedBackground>
  );
};

export default Home;
