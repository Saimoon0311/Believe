import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Colors, FontFamily, FontSize} from '@/theme/Variables';
import {Touchable} from './Touchable';
import {back} from '@/Assets/Images';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const MenuReview = ({
  title,
  visible,
  hideMenu,
  showMenu,
  navigation: {goBack},
  viewReviews,
}) => {
  return (
    <View style={styles.container}>
      <Touchable Opacity={0.7} onPress={goBack}>
        <Image source={back} style={styles.back} />
      </Touchable>
      <Text numberOfLines={1} style={styles.heading}>
        {title}
      </Text>
      <Menu opened={visible} onBackdropPress={hideMenu}>
        <MenuTrigger
          children={
            // <Touchable onPress={showMenu}>
            <SimpleLineIcons
              size={20}
              name="options-vertical"
              color={'transparent'}
              // color={Colors.white}
            />
            // </Touchable>
          }></MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={viewReviews} style={styles.button}>
            <Text style={styles.text}>Reviews</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default React.memo(MenuReview);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: Colors.blueBar,
  },
  text: {
    marginLeft: 7.5,
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.large,
    fontFamily: FontFamily.semiBold,
  },
  heading: {
    fontSize: 22,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
});
