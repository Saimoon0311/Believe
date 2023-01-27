import React from 'react';
import {Dimensions, Platform, Image, Text} from 'react-native';
import {CardStyleInterpolators} from '@react-navigation/stack';
import * as Images from '../Assets/Images';
const {width, height} = Dimensions.get('window');

const Colors = {
  primaryColor: '#03174C',
  primaryColorFaded: '#759CFA',
  yellow2: '#F2E3B5',
  lightGray2: '#98A1BD',
  barFaded: 'rgba(49,74,138,0.63)',
  searchFaded: 'rgba(60,75,119,0.78)',
  lightFaded: 'rgba(29, 134, 202, 0.31)',
  darkFaded: 'rgba(5, 33, 65, 0.9)',
  primaryFaded: 'rgba(29, 134, 202, 0.31)',
  downloadFaded: 'rgba(29, 134, 202)',
  primaryColor2: '#4A7DD4',
  primaryColor3: '#13396E',
  blueMenu: 'rgba(5, 33, 65, 0.8)',
  blueMenu2: 'rgba(60, 75, 119, 0.3)',
  blueButton: 'rgba(29, 134, 202, 0.3)',
  blueBar: 'rgba(5, 33, 65,1)',
  darkBlue: 'rgba(6, 42, 89, 0.71)',
  borderBlue: '#22C7FF',
  borderBlue2: 'rgba(208, 220, 255, 0.5)',
  background: 'rgba(60, 75, 119, 0.75)',
  backgroundBlue: '#052141',
  buttonBlue: 'rgba(49, 74, 142, 0.63)',
  border: '#6CF8E0',
  border2: '#3A88E2',
  blue: '#43B7E8',
  darkBlue2: '#07385C',
  darkBlue3: '#0C5185',
  graphBlue: '#60F8DE',
  green: '#60F8DD',
  fadeBlue: 'rgba(29, 134, 202, 0.3)',
  label: '#ADB9D1',
  darkGreen: '#2C695F',
  fadeGreen: 'rgba(69, 197, 175, 0.11)',
  overlayColor: 'rgba(60, 75, 119, 0.7)',
  lightBackground: 'rgba(60, 75, 119, 0.11)',
  greenCard: 'rgba(63, 181, 165, 0.5)',
  greenCard2: '#3FB5A5',
  greenCard3: 'rgba(69, 197, 175, 0.6)',
  greenCard4: 'rgba(69, 197, 175, 1)',
  greenCard5: '#ADFFF1',
  greenCardBorder: '#72EEDD',
  // primaryColor: '#0E2A79',
  secondaryColor: '#060C1E',
  greenFaded: '#45C5AF',
  borderGreen: '#74F4DE',
  whiteFaded: '#EBEAEC',
  yellow: '#FFE7BF',
  rating: '#FFBA49',
  redFade: '#FF4F40',
  lightRed: '#FD6F6F',
  black2: '#072348',
  line: '#2F5C84',
  seconds: '#DA2E7C',
  bottomLine: '#D0DCFF',
  // primaryColor: '#13678A',
  // primaryColor: '#C3FFF5',
  transparent: 'rgba(0, 0, 0, 0)',
  blurBlack: 'rgba(0, 0, 0, 0.4)',
  blurWhite: 'rgba(255, 255, 255, 0.5)',
  blurWhite1: 'rgba(255, 255, 255, 0.2)',
  blurWhite2: 'rgba(255, 255, 255, 0.6)',
  blurWhite3: 'rgba(255, 255, 255, 0.42)',
  blurWhite4: 'rgba(255, 255, 255, 0.2)',
  white: '#ffffff',
  white2: '#DEDEDE',
  black: '#000000',
  text: '#212529',
  red: 'red',
  gray: '#C5C6CA',
  gray2: 'rgba(60, 75, 119, 0.7)',
  lightGray: '#A1A4B2',
  fadedGray: '#EBEAEC',
  grayBackground: 'rgba(3,23,76,0.23)',
  grayScale: '#b8c0d6',
  success: '#28a745',
  placeholder: '#C4C4C4',
  switch: 'rgba(60, 75, 119, 0.4)',
  card: 'rgba(29 ,134 ,202 ,0.41)',
  blackDark: 'rgba(0,0,0,0.4)',
};

const NavigationColors = {
  primary: Colors.primary,
};

/** FontSize **/
const FontSize = {
  scale12: Math.round(width / 36),
  scale16: Math.round(width / 27),
  scale18: Math.round(width / 24),
  scale20: Math.round(width / 21.5),
  scale24: Math.round(width / 18),
  scale32: Math.round(width / 13.5),
  small: 8,
  medium: 10,
  regular: 12,
  default: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 20,
  xxxlarge: 22,
};
const FontFamily = {
  light: 'Rubik-Light',
  regular: 'Rubik-Regular',
  medium: 'Rubik-Medium',
  semiBold: 'Rubik-Semibold',
  extraBold: 'Rubik-ExtraBold',
  bold: 'Rubik-Bold',
  black: 'Rubik-Black',
};

const Sizes = {
  width,
  height,
  h10: Math.round(height * 0.0125),
  h20: Math.round(height * 0.025),
};

const topTabsStyles = {
  tabBarLabelStyle: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    textTransform: 'none',
  },
  tabBarInactiveTintColor: '#22222280',
  tabBarActiveTintColor: Colors.heading,
  tabBarIndicatorStyle: {
    backgroundColor: Colors.heading,
    marginBottom: 5,
    width: Sizes.width / 4,
    left: Sizes.width / 8,
  },
  tabBarPressColor: '#FAF0E7',
  lazy: true,
};

const modalStyles = {
  flex: 1,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  backgroundColor: Colors.blueMenu,
  // backgroundColor: Colors.darkFaded,
};

const modalAdStyles = {
  margin: 50,
  borderRadius: 10,
  marginBottom: 250,
  shadowColor: Colors.transparent,
  backgroundColor: Colors.transparent,
};

const overlayStyle = {
  backgroundColor: 'rgba(0,0,0,0.5)',
};

const screenOptions = {
  headerTitleStyle: {
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerTintColor: Colors.white,
};

export const bottomTabRoute = ({route: {name}}) => ({
  tabBarIcon: ({focused}) => (
    <Image
      source={Images[name.replace('Stack', '')]}
      style={{
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: focused ? Colors.white : Colors.grayScale,
      }}
    />
  ),
  lazy: true,
  headerShown: false,
  tabBarStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 0,
    height: Platform.OS == 'ios' ? 100 : 70,
    alignItems: 'center',
    borderTopWidth: 0,
  },
  tabBarLabel: ({focused}) => (
    <>
      {focused && (
        <Image
          source={Images.dot}
          style={{
            width: 25,
            height: 25,
            // height: width * 0.02,
            // width: width * 0.02,
            resizeMode: 'contain',
            position: 'absolute',
            bottom: '18%',
          }}
        />
      )}
      <Text
        style={{
          marginBottom: 5,
          fontSize: FontSize.scale12,
          fontFamily: FontFamily.medium,
          color: focused ? Colors.white : Colors.grayScale,
        }}>
        {name.replace('Stack', '')}
      </Text>
      {/* {focused && (
        <View
          style={{
            bottom: 4,
            position: 'absolute',
            height: 4,
            width: 4,
            borderRadius: 2,
            // marginBottom:5,
            backgroundColor: focused ? Colors.primaryColor : Colors.white,
          }}
        />
      )} */}
    </>
  ),
});

const animationConfig = {
  cardOverlayEnabled: true,
  animationEnabled: false,
  gestureEnabled: Platform.OS === 'ios',
  detachPreviousScreen: false,
  headerShown: false,
  // cardStyleInterpolator: ({current}) => ({opacity: current.progress}),
};

export {
  Colors,
  FontSize,
  FontFamily,
  modalStyles,
  modalAdStyles,
  overlayStyle,
  Sizes,
  topTabsStyles,
  screenOptions,
  NavigationColors,
  animationConfig,
};
