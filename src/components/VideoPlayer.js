import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  BackHandler,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import Video from 'react-native-video';
import {Colors, FontFamily} from '@/theme/Variables';
import {Touchable} from '@/components/Touchable';
import Orientation from 'react-native-orientation-locker';
import {backward, forward, pauseButton, playButton} from '@/Assets/Images';
import {Slider} from '@miblanchard/react-native-slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');
class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      paused: false,
      // paused: true,
      overlay: false,
      buffer: false,
      mute: false,
      fullScreen: false,
    };
  }

  getTime = t => {
    const digit = n => (n < 10 ? `0${n}` : `${n}`);
    const sec = digit(Math.floor(t % 60));
    const min = digit(Math.floor((t / 60) % 60));
    // const hr = digit(Math.floor((t / 3600) % 60));
    return min + ':' + sec;
  };

  hideFullScreen = () => {
    const {fullscreen} = this.props;
    if (fullscreen) {
      Orientation.lockToPortrait();
      // Orientation.addDeviceOrientationListener(type => {
      //   console.log('true', type);
      // });
      this.props.checkFullScreen(false);
    } else {
      Orientation.lockToPortrait();
      // Orientation.addDeviceOrientationListener(type => {
      //   console.log('true', type);
      // });
      this.props.checkFullScreen(false);
      this.props.navigation.goBack();
    }
    return true;
  };

  setFullScreen = () => {
    const {fullscreen} = this.props;
    if (fullscreen) {
      Orientation.lockToPortrait();
      // Orientation.addDeviceOrientationListener(type => {
      //   console.log('true', type);
      // });
      this.props.checkFullScreen(false);
    } else {
      Orientation.lockToLandscape();
      // Orientation.addDeviceOrientationListener(type => {
      //   console.log('fasle', type);
      // });
      this.props.checkFullScreen(true);
    }
  };

  videoLoadStart = () => this.setState({buffer: true});

  videoLoad = ({duration}) => {
    this.setState({duration});
    this.setState({buffer: false});
  };

  videoProgress = ({currentTime}) => this.setState({currentTime});

  videoEnd = () => {
    this.setState({
      paused: true,
      currentTime: 0,
    });
    this.video.seek(0);
  };

  hideOverlay = () => {
    const {overlay} = this.state;
    if (!overlay) {
      this.setState({overlay: true});
      setTimeout(this.setState({overlay: false}), 3000);
    } else {
      this.setState({overlay: false});
    }
  };

  handleMute = () => this.setState({mute: !this.state.mute});

  handlePlayer = () => this.setState({paused: !this.state.paused});

  backward = () => {
    this.video.seek(this.state.currentTime - 30);
    this.setState({currentTime: this.state.currentTime - 30}); //Time
    clearTimeout(this.overlayTimer);
    this.overlayTimer = setTimeout(() => this.setState({overlay: false}), 3000);
  };

  forward = () => {
    this.video.seek(this.state.currentTime + 30);
    this.setState({currentTime: this.state.currentTime + 30}); //Time
    clearTimeout(this.overlayTimer);
    this.overlayTimer = setTimeout(() => this.setState({overlay: false}), 3000);
  };

  onSlide = slide => {
    this.video.seek(Math.floor(slide * this.state.duration));
    // this.
    clearTimeout(this.overlayTimer);
    this.overlayTimer = setTimeout(() => this.setState({overlay: false}), 3000);
  };

  lastTap = null;

  handleDoubleTap = (doubleTapCallback, singleTapCallback) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    const delta = now - this.lastTap;
    if (this.lastTap && delta < DOUBLE_PRESS_DELAY) {
      clearTimeout(this.timer);
      doubleTapCallback();
      console.log('double press');
    } else {
      this.lastTap = now;
      this.timer = setTimeout(() => {
        singleTapCallback();
        console.log('single press');
      }, DOUBLE_PRESS_DELAY);
    }
  };

  seekLeft = () => {
    const {currentTime} = this.state;
    this.handleDoubleTap(
      () => {
        this.video.seek(currentTime - 30);
      },
      () => {
        this.setState({overlay: true});
        this.overlayTimer = setTimeout(
          () => this.setState({overlay: false}),
          3000,
        );
      },
    );
  };

  seekRight = () => {
    const {currentTime} = this.state;
    this.handleDoubleTap(
      () => {
        this.video.seek(currentTime + 30);
      },
      () => {
        this.setState({overlay: true});
        this.overlayTimer = setTimeout(
          () => this.setState({overlay: false}),
          3000,
        );
      },
    );
  };

  // onSlide = slide => {
  //   this.video.seek(slide * duration);
  // };
  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', hideFullScreen);
  //   return () => {
  //     setPlayer(initialState);
  //     hideFullScreen();
  //   };
  //   // return () => backHandler.remove();
  // }, []);

  componentDidMount() {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.hideFullScreen,
    );
    return () => backHandler.remove();
  }

  componentWillUnmount() {
    const backHandler = BackHandler.removeEventListener(
      'hardwareBackPress',
      this.hideFullScreen,
    );
    return;
    // return () => backHandler.remove();
  }
  render() {
    const {data, fullscreen} = this.props;
    const {currentTime, duration, paused, overlay, buffer, mute, fullScreen} =
      this.state;
    const currentAudioposition = currentTime / duration;
    return (
      // <View style={styles.container}>
      <View
        style={{
          backgroundColor: Colors.black,
          width: fullscreen ? '100%' : '90%',
          marginHorizontal: fullscreen ? 0 : '5%',
          borderRadius: 10,
          height: fullscreen ? '100%' : 225,
          marginTop: fullscreen ? 0 : '5%',
          // height: '53.1%',
          // position: fullScreen ? 'absolute' : 'relative',
          // width: fullScreen ? widthPercentageToDP('100') : '100%',
          // height: fullScreen ? height * 0.4 : height * 0.27,
          // zIndex: fullScreen ? 1 : 0,
          // flex: 1,
          // height: fullScreen ? height * 0.53 : height * 0.27,
        }}>
        <Video
          muted={mute}
          paused={paused}
          ref={ref => {
            this.video = ref;
          }}
          style={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            borderRadius: 10,
            position: 'absolute',
            // position: fullScreen ? 'absolute' : 'relative',
            // width: fullScreen ? widthPercentageToDP('100') : '100%',
            // height: fullScreen ? height * 0.9 : height * 0.27,
            // zIndex: fullScreen ? 1 : 0,
          }}
          source={{
            uri: data?.url,
          }}
          resizeMode="cover"
          fullscreen={fullscreen}
          // resizeMode="contain"
          onLoad={this.videoLoad}
          onLoadStart={this.videoLoadStart}
          onProgress={this.videoProgress}
          onEnd={this.videoEnd}
        />
        {/* {!overlay && (
                <View style={{position: 'absolute', bottom: 0}}>
                  <Slider
                    value={currentTime / duration}
                    onValueChange={this.onSlide}
                    containerStyle={{
                      width: fullScreen ? width * 2 : width,
                      height: 5,
                    }}
                    minimumValue={0}
                    thumbStyle={{width: 7.5, height: 7.5}}
                    minimumTrackTintColor={Colors.white}
                    // maximumTrackTintColor={Colors.white}
                    thumbTintColor={Colors.transparent}
                  />
                </View>
              )} */}
        {buffer && (
          <View style={[styles.controlCover, {justifyContent: 'center'}]}>
            <Image
              source={{
                uri: 'https://i.gifer.com/VAyR.gif',
              }}
              style={{
                height: 60,
                width: 60,
                resizeMode: 'contain',
              }}
            />
          </View>
        )}
        <View style={styles.controlCover}>
          <TouchableWithoutFeedback>
            {
              overlay ? (
                <View
                  style={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    position: 'absolute',
                    // alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    paddingHorizontal: '5%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      top: heightPercentageToDP('3'),
                    }}>
                    <Touchable Opacity={0.7} onPress={this.backward}>
                      <Image style={styles.centerButton} source={backward} />
                    </Touchable>
                    <Touchable onPress={this.handlePlayer} Opacity={0.8}>
                      <Image
                        source={paused ? playButton : pauseButton}
                        style={styles.pause}
                      />
                    </Touchable>
                    <Touchable Opacity={0.7} onPress={this.forward}>
                      <Image style={styles.centerButton} source={forward} />
                    </Touchable>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      top: fullscreen
                        ? heightPercentageToDP('15')
                        : heightPercentageToDP(
                            Platform.OS == 'ios' ? '6' : '7',
                          ),
                      alignItems: 'center',
                    }}>
                    <Slider
                      thumbStyle={styles.thumb}
                      value={currentAudioposition}
                      onSlidingComplete={this.onSlide}
                      thumbTintColor={Colors.white}
                      containerStyle={styles.sliderContainer(fullscreen)}
                      minimumTrackTintColor={Colors.white}
                      maximumTrackTintColor={Colors.blurWhite1}
                    />
                    {fullscreen ? (
                      <MaterialIcons
                        name="fullscreen-exit"
                        color={'white'}
                        onPress={this.setFullScreen}
                        size={heightPercentageToDP('3')}
                        style={{
                          marginLeft: widthPercentageToDP('4'),
                        }}
                      />
                    ) : (
                      <MaterialIcons
                        name="fullscreen"
                        color={'white'}
                        onPress={this.setFullScreen}
                        size={heightPercentageToDP('3')}
                        style={{
                          marginLeft: widthPercentageToDP('4'),
                        }}
                      />
                    )}
                  </View>
                </View>
              ) : (
                <View style={styles.overlaySet}>
                  <TouchableWithoutFeedback onPress={this.seekLeft}>
                    <View style={{flex: 1}} />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={this.seekRight}>
                    <View style={{flex: 1}} />
                  </TouchableWithoutFeedback>
                </View>
              )
              // null
            }
          </TouchableWithoutFeedback>
        </View>
        {/* <View style={styles.controlCover}>
                <TouchableWithoutFeedback>
                  {
                    overlay ? (
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <View
                          style={[
                            styles.heading,
                            {
                              width: fullScreen ? width * 2 : width,
                            },
                          ]}>
                          <Touchable>
                            <Ionicons
                              name="arrow-back"
                              size={20}
                              color={Colors.white}
                              onPress={this.hideFullScreen}
                            />
                          </Touchable>
                          <Text
                            style={[
                              styles.time,
                              {
                                fontSize: FontSize.scale12 + 2,
                              },
                            ]}>
                            Big Buck Bunny
                          </Text>
                          <Entypo
                            name="dots-three-vertical"
                            size={20}
                            color={Colors.white}
                          />
                        </View>
                        <View
                          style={[
                            styles.mainContainer,
                            {
                              width: fullScreen ? width * 2 : width,
                              height: fullScreen
                                ? height * 0.175
                                : height * 0.11,
                            },
                          ]}>
                          <View
                            style={[
                              styles.timeContainer,
                              {
                                width: fullScreen ? width * 1.9 : width * 0.95,
                              },
                            ]}>
                            <Text style={styles.time}>
                              <Text style={styles.time}>
                                {this.getTime(currentTime)}
                              </Text>
                            </Text>
                            <Slider
                              value={currentTime / duration}
                              onValueChange={this.onSlide}
                              containerStyle={{
                                height: 15,
                                width: fullScreen ? width * 1.7 : width * 0.725,
                              }}
                              minimumValue={0}
                              thumbStyle={{width: 12.5, height: 12.5}}
                              minimumTrackTintColor={Colors.white}
                              thumbTintColor={Colors.white}
                            />
                            <Text style={styles.time}>
                              {this.getTime(duration)}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.controllers,
                              {
                                paddingHorizontal: fullScreen ? 60 : 20,
                                width: fullScreen ? width * 2 : width,
                              },
                            ]}>
                            <Touchable>
                              <Octicons
                                size={20}
                                color={Colors.white}
                                onPress={this.handleMute}
                                name={mute ? 'mute' : 'unmute'}
                              />
                            </Touchable>
                            <FontAwesome
                              size={20}
                              color={Colors.white}
                              name="step-backward"
                            />
                            <View
                              style={[
                                styles.buttons,
                                {
                                  width: fullScreen
                                    ? width * 0.65
                                    : width * 0.375,
                                },
                              ]}>
                              <FontAwesome
                                size={22.5}
                                name="backward"
                                color={Colors.white}
                                onPress={this.backward}
                              />
                              <FontAwesome
                                size={30}
                                color={Colors.white}
                                onPress={this.handlePlayer}
                                name={paused ? 'play' : 'pause'}
                              />
                              <FontAwesome
                                size={22.5}
                                name="forward"
                                color={Colors.white}
                                onPress={this.forward}
                              />
                            </View>
                            <FontAwesome
                              size={20}
                              name="step-forward"
                              color={Colors.white}
                            />
                            <Touchable>
                              <MaterialIcons
                                name="fullscreen"
                                size={20}
                                color={Colors.white}
                                onPress={this.setFullScreen}
                              />
                            </Touchable>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.overlaySet}>
                        <TouchableWithoutFeedback onPress={this.seekLeft}>
                          <View style={{flex: 1}} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.seekRight}>
                          <View style={{flex: 1}} />
                        </TouchableWithoutFeedback>
                      </View>
                    )
                    // null
                  }
                </TouchableWithoutFeedback>
              </View> */}
      </View>
    );
  }
}

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // margin: 20,
    marginTop: '5%',
    marginHorizontal: '5%',
    alignItems: 'center',
    borderRadius: 10,
  },
  overlay: {
    // ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.primaryColor,
  },
  overlaySet: {
    flex: 1,
    flexDirection: 'row',
  },
  sliderContainer: fullscreen => ({
    // left: 0,
    // right: 0,
    // bottom: 0,
    // position: 'absolute',
    width: fullscreen ? widthPercentageToDP('190') : widthPercentageToDP('70'),
  }),
  timer: {
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  icon: {
    flex: 1,
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  time: {
    fontSize: 16,
    color: Colors.white,
  },
  controlCover: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    // marginHorizontal: '5%',
  },
  mainContainer: {
    bottom: 0,
    alignItems: 'center',
    position: 'absolute',
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  controllers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    color: Colors.white,
    fontFamily: FontFamily.bold,
  },
  heading: {
    top: 0,
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: Sizes.height * 0.05,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  pause: {
    tintColor: Colors.greenFaded,
  },
  thumb: {
    width: 13.25,
    // marginRight: widthPercentageToDP('-2'),
    height: 13.25,
  },
  centerButton: {
    width: 26.5,
    height: 26.5,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
});
