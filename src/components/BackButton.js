import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {back} from '@/Assets/Images';
import {Colors} from '@/theme/Variables';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {heightPercentageToDP} from 'react-native-responsive-screen';
const BackButton = ({
  navigation,
  backButton,
  home,
  menu,
  buttonMedium,
  iconChange,
  iconPress,
  nextText,
  iconColor,
  menuStyles,
  iconStyle,
}) => {
  return (
    <>
      {menu ? (
        <>
          <TouchableOpacity
            style={{
              marginLeft: menu ? '5%' : '0%',
              ...menuStyles,
            }}
            onPress={iconPress}
            activeOpacity={0.7}>
            {nextText && (
              <Text
                style={{color: 'white', fontSize: heightPercentageToDP('2')}}>
                {nextText}
              </Text>
            )}
            <SimpleLineIcons
              name={iconChange ? iconChange : 'options-vertical'}
              color={iconColor ? iconColor : Colors.white}
              size={20}
              style={iconStyle}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.button,
              {
                paddingLeft: buttonMedium ? '30%' : '0%',
                marginLeft: home ? '5%' : '0%',
                marginTop: home ? '5%' : '0%',
              },
            ]}
            onPress={backButton ? null : () => navigation.goBack()}>
            <Image
              source={back}
              style={[
                styles.back,
                {
                  marginLeft: backButton ? '0%' : '5%',
                  tintColor: backButton ? Colors.transparent : Colors.white,
                },
              ]}
            />
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  back: {
    width: 20,
    height: 20,
    marginVertical: '5%',
    // marginHorizontal: '5%',
    // alignSelf: 'flex-start',
    // paddingTop: 20,
    // paddingLeft: 20,
    // paddingBottom: 10,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    // backgroundColor: 'red',
    // paddingHorizontal: 5,
  },
});
