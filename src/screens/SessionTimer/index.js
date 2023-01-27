// import React from 'react';
// import {View, Text, Image} from 'react-native';
// import * as Images from '@/Assets/Images';
// import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
// import SessionHeading from '@/components/SessionHeading';
// import BlurBackground from '@/components/BlurBackground';
// import {Touchable} from '@/components/Touchable';
// import useSessionTimer from './useSessionTimer';
// import SafeView from '@/components/SafeView';
// import {contentTime} from '@/utils/helper';
// import {Colors} from '@/theme/Variables';
// import {styles} from './styles';
// import ShareButton from '@/components/ShareButton';

// const SessionTimer = ({navigation, route}) => {
//   const {
//     data,
//     background,
//     time,
//     isPlaying,
//     setSound,
//     onComplete,
//     closeAudio,
//     isComplete,
//   } = useSessionTimer(navigation, route);
//   const imageSource = isPlaying ? Images?.pauseButton : Images?.playButton;
//   const completeHandler = () => {
//     ({
//       shouldRepeat: false,
//     });
//     onComplete();
//   };
//   const colorsTime = Math.floor(time / 2);
//   console.log('colorsTime', colorsTime);
//   return (
//     <BlurBackground
//       blurhash={background?.hash_code || ''}
//       styles={styles.backgroundImage}
//       uri={background?.background_image}>
//       <SafeView>
//         <SessionHeading {...{navigation, backButton: true, closeAudio}} />
//         {!isComplete && (
//           <View style={styles.container}>
//             <View>
//               <Text style={styles.title}>Meditation</Text>
//               <Text style={styles.timer}>{contentTime(data?.meditation)}</Text>
//             </View>

//             <CountdownCircleTimer
//               size={320}
//               key={time}
//               duration={time}
//               strokeWidth={15}
//               trailStrokeWidth={3}
//               strokeLinecap="round"
//               isPlaying={isPlaying}
//               trailColor="rgba(69,197,175,0.25)"
//               // colors={Colors.greenCard2}
//               // colors={['#03325d', '#018988']}
//               // colorsTime={[time, colorsTime, colorsTime]}
//               colors={['#03325d', '#018988', '#03325d', '#018988']}
//               colorsTime={[time, 5, 2, 4]}
//               rotation="clockwise"
//               onComplete={completeHandler}>
//               {({remainingTime}) => (
//                 <Text style={styles.count}>{contentTime(remainingTime)}</Text>
//               )}
//             </CountdownCircleTimer>

//             <View>
//               <Touchable
//                 style={{alignItems: 'center'}}
//                 onPress={setSound}
//                 Opacity={0.7}>
//                 <Image
//                   source={imageSource}
//                   style={{tintColor: Colors.blurWhite3}}
//                 />
//               </Touchable>
//               <Text style={styles.timer}>{isPlaying ? 'Stop' : 'Start'}</Text>
//             </View>
//           </View>
//         )}
//         {isComplete && (
//           <View style={styles.container}>
//             <Image source={Images.meditate} style={{width: 250, height: 250}} />
//             <View
//               style={{
//                 width: '80%',
//                 backgroundColor: Colors.fadeGreen,
//                 flexDirection: 'row',
//                 borderRadius: 5,
//                 alignItems: 'center',
//                 padding: 10,
//               }}>
//               <Image source={Images.calendar} />
//               <Text
//                 style={[
//                   styles.timer,
//                   {fontSize: 14, fontWeight: '400', marginLeft: 10},
//                 ]}>
//                 {new Date().toDateString()}
//               </Text>
//             </View>
//             <View>
//               <Text style={styles.timer}>congratulations</Text>
//               <Text style={[styles.timer, {fontSize: 14, fontWeight: '400'}]}>
//                 you just completed {contentTime(data?.meditation, true)}
//               </Text>
//             </View>
//             <ShareButton title="Finish" onPress={() => {}} hide={true} />
//           </View>
//         )}
//       </SafeView>
//     </BlurBackground>
//   );
// };

// export default React.memo(SessionTimer);

import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  BackHandler,
  ScrollView,
  Dimensions,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import * as Images from '@/Assets/Images';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Animation from 'lottie-react-native';
import SessionHeading from '@/components/SessionHeading';
import BlurBackground from '@/components/BlurBackground';
import {Touchable} from '@/components/Touchable';
import SafeView from '@/components/SafeView';
import {contentTime} from '@/utils/helper';
import {Colors} from '@/theme/Variables';
import {styles} from './styles';
import ShareButton from '@/components/ShareButton';
import {connect} from 'react-redux';
import {playMusic} from '@/store/actions/music-action';
import {getValue} from '@/services/storage';
import StreakSection from '../Home/streakSection';
import {store} from '@/store/store';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import ViewShot from 'react-native-view-shot';
import Lottie from 'lottie-react-native';
import * as LottieBadges from '@/Assets/lottie';
import API from '@/services/API';

export class SessionTimer extends PureComponent {
  constructor(props) {
    super(props);
    this.viewShotRef = React.createRef(null);
    this.state = {
      isPlaying: false,
      isComplete: false,
      bell: false,
      animation: false,
      badgeData: [],
    };
  }

  getBadges = async () => {
    try {
      const {ok, data} = await API.get('/get-all-achievements');
      if (ok) this.setState({badgeData: data});
    } catch (error) {
      console.log(error, 'error');
    }
  };

  componentDidMount() {
    this.getBadges();
    const {navigation, route} = this.props;
    this.gestureEnd = navigation.addListener('gestureEnd', e =>
      this.closeAudio(),
    );

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      this.closeAudio(),
    );
    TrackPlayer.destroy();
    this.props.appMusic(false);
    TrackPlayer.setupPlayer()
      .then(() => this.initiliazeTrack(route?.params?.startBell))
      .catch(err => console.log(err, 'error'));
  }

  componentWillUnmount() {
    TrackPlayer.destroy();
    this.backHandler.remove();
    this.gestureEnd();
    this.props.appMusic(getValue('background') == 'true');
  }

  completeHandler = () => {
    ({
      shouldRepeat: false,
    });
    const {endBell} = this.props.route?.params;
    TrackPlayer.reset();
    this.initiliazeTrack(endBell);
    TrackPlayer.play();
    this.setState({isComplete: true});
    this.setSound();
    this.animation?.play();
  };

  setSound = () => {
    const {bell, isPlaying} = this.state;
    if (!bell && !isPlaying) {
      TrackPlayer.play();
      this.setState({bell: true});
    }
    this.setState({isPlaying: !isPlaying});
  };

  closeAudio = () => {
    TrackPlayer.stop();
    return false;
  };

  initiliazeTrack = async dataTrack => {
    try {
      await TrackPlayer.add(dataTrack);
    } catch (error) {
      console.log(error);
    }
  };

  animationComplete = () => {
    this.setState({animation: true}, () => this.animation.pause());
  };

  render() {
    const {route, navigation} = this.props;
    const {isComplete, isPlaying, animation, badgeData} = this.state;
    const {meditation, background} = route?.params;
    const imageSource = isPlaying ? Images?.pauseButton : Images?.playButton;
    const initialState = {all_badges: [], last_unlocked: {}};
    const {last_unlocked} = badgeData || initialState;
    const {Content} = store.getState('Content');
    const {Auth} = store.getState('Auth');
    const {user} = Auth;
    const {homeContent} = Content;
    return (
      <BlurBackground
        blurhash={background?.hash_code || ''}
        styles={styles.backgroundImage}
        uri={background?.background_image}>
        <SafeView>
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            loop={false}
            source={require('../../Assets/lottie/confetti.json')}
            onAnimationFinish={this.animationComplete}
          />
          <SessionHeading
            {...{navigation, backButton: true, closeAudio: this.closeAudio}}
          />
          {!isComplete && (
            <View style={styles.container}>
              {/* <View>
                <Text style={styles.title}>Meditation</Text>
                <Text style={styles.timer}>{contentTime(meditation)}</Text>
              </View> */}

              <CountdownCircleTimer
                size={320}
                duration={meditation}
                strokeWidth={18}
                trailStrokeWidth={3}
                strokeLinecap="round"
                isPlaying={isPlaying}
                trailColor={Colors.blurWhite4}
                // trailColor="rgba(69,197,175,0.25)"
                colors={[Colors.blurWhite4, Colors.blurWhite4]}
                // colors={['#287a8b', '#38a79f']}
                // colors={[Colors.blurWhite4, '#38a79f']}
                // colorsTime={[meditation]}
                rotation="counterclockwise"
                isSmoothColorTransition
                onComplete={this.completeHandler}>
                {({remainingTime}) => (
                  <Text style={styles.count}>{contentTime(remainingTime)}</Text>
                )}
              </CountdownCircleTimer>

              <View>
                <Touchable
                  style={{
                    alignItems: 'center',
                    backgroundColor: Colors.blurWhite4,
                    paddingLeft: isPlaying
                      ? widthPercentageToDP('0')
                      : widthPercentageToDP('1'),
                    borderRadius: Math.round(
                      Dimensions.get('window').width +
                        Dimensions.get('window').height,
                    ),
                    width: Dimensions.get('window').width * 0.23,
                    height: Dimensions.get('window').width * 0.23,
                    justifyContent: 'center',
                  }}
                  onPress={this.setSound}
                  Opacity={0.7}>
                  <Image
                    source={imageSource}
                    resizeMode="contain"
                    style={{
                      tintColor: Colors.white,
                      width: widthPercentageToDP('6'),
                    }}
                  />
                </Touchable>
                {/* <Text style={styles.timer}>{isPlaying ? 'Stop' : 'Start'}</Text> */}
              </View>
            </View>
          )}
          {isComplete && (
            <ScrollView
              // contentContainerStyle={{
              //   flex: 1,
              // }}
              showsVerticalScrollIndicator={false}>
              <ViewShot
                ref={this.viewShotRef}
                style={[styles.container, {flex: 1, height: 'auto'}]}>
                <Text style={{fontSize: 46, color: Colors.white}}>
                  Congratulations
                </Text>
                <View
                  style={[
                    styles.container,
                    {
                      width: '100%',
                      opacity: animation ? 1 : 0,
                    },
                  ]}>
                  <Lottie
                    source={LottieBadges[last_unlocked?.name]}
                    autoPlay
                    style={{height: 200}}
                  />
                  {/* <Lottie
                    source={LottieBadges[last_unlocked?.name]}
                    autoPlay
                    style={{height: 200}}
                  /> */}
                  {/* <Image
                  source={Images.meditate}
                  style={{width: 250, height: 250}}
                /> */}
                  <View>
                    <Text
                      style={[
                        styles.timer,
                        {fontSize: 18, fontWeight: '400', marginTop: hp('2')},
                      ]}>
                      You have completed your {contentTime(meditation, true)} of
                      meditation
                    </Text>
                  </View>
                  <View style={styles.steaksView}>
                    <StreakSection {...homeContent} />
                    {/* <ShareButton
                      style={{width: '95%', alignSelf: 'center'}}
                      title="Share My Stats"
                      onPress={() => shareStats(this.viewShotRef)}
                    /> */}
                  </View>
                  {!user?.is_subscribed && (
                    <ShareButton
                      title="Unlock Believe Premium"
                      textStyle={{fontSize: hp('2.1')}}
                      onPress={() => navigation.navigate('Subscription')}
                      style={{marginBottom: hp('5')}}
                      hide={true}
                    />
                  )}
                  <ShareButton
                    title="Finish"
                    onPress={() => navigation.goBack()}
                    hide={true}
                  />
                </View>
              </ViewShot>
            </ScrollView>
          )}
        </SafeView>
      </BlurBackground>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    appMusic: appMusic => {
      console.log(appMusic, 'appMusic');
      dispatch(playMusic({appMusic}));
    },
  };
};
export default connect(null, mapDispatchToProps)(SessionTimer);
