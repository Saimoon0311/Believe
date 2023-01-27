import React, {useRef} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ViewShot from 'react-native-view-shot';
import {normal} from '@/Assets/lottie';
import PageHeading from '@/components/PageHeading';
import Animation from 'lottie-react-native';
import Button from '@/components/Button';
import {Colors, FontFamily, FontSize} from '@/theme/Variables';
import * as Badges from '@/Assets/lottie/unlockAnimation';
import StreakSection from '../Home/streakSection';
import useReduxStore from '@/hooks/useReduxStore';
import ShareButton from '@/components/ShareButton';
import {shareStats} from '@/services/ShareStats';
import AnimatedBackground from '@/components/AnimatedBackground';

const Achievement = ({navigation, route}) => {
  /* A reference to the ViewShot component. */
  const viewShotRef = useRef(null);
  /* Destructuring the getState function from the useReduxStore hook. */
  const {getState} = useReduxStore();
  /* Destructuring the homeContent from the Content reducer. */
  const {homeContent} = getState('Content');
  /* Destructuring the user object from the Auth reducer. */
  const {user} = getState('Auth');
  const {params} = route;
  return (
    <ScrollView
      contentContainerStyle={styles.flex}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <ViewShot ref={viewShotRef}>
        <AnimatedBackground animation={normal}>
          <PageHeading {...{title: '', navigation, backButton: true}} />
          <View style={styles.mainContainer}>
            <Text style={styles.congratsHeading}>Congratulations!</Text>
            <Animation
              source={Badges[params?.achievement_key]}
              autoPlay
              loop
              style={styles.badge}
            />
            <Text style={styles.desc}>{params?.description}</Text>
            <View style={styles.streaksContainer}>
              <StreakSection {...homeContent} />
              <ShareButton
                title="Share My Stats"
                onPress={() => shareStats(viewShotRef)}
              />
            </View>
            {Boolean(!user?.is_subscribed) && (
              <Button.Normal
                title="Unlock Believe Premium"
                onPress={() => navigation.navigate('Subscription')}
              />
            )}
          </View>
        </AnimatedBackground>
      </ViewShot>
    </ScrollView>
  );
};

/* React.memo is a higher order component. It’s similar to React.PureComponent but for function
components instead of classes. */
export default React.memo(Achievement);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  mainContainer: {
    flex: 0.95,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  congratsHeading: {
    fontSize: FontSize.scale32,
    color: Colors.white,
    fontFamily: FontFamily.regular,
    textTransform: 'uppercase',
  },
  badge: {height: 200},
  desc: {
    fontSize: FontSize.scale20,
    color: Colors.white,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
  },
  streaksContainer: {
    height: 240,
    width: '100%',
    backgroundColor: 'rgba(5,33,65,0.8)',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'space-between',
  },
});
