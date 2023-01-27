import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Colors, FontFamily, FontSize} from '@/theme/Variables';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Touchable} from './Touchable';
import {downArrow} from '@/Assets/Images';

const MenuList = ({
  data,
  visible,
  hideMenu,
  showMenu,
  onSelect,
  momentView,
}) => {
  return (
    <View style={styles.button}>
      <Menu opened={visible} onBackdropPress={hideMenu}>
        <MenuTrigger
          children={
            <Touchable Opacity={0.7} onPress={showMenu} style={styles.select}>
              <Text style={styles.time}>{momentView?.title}</Text>
              <Image style={styles.icon} source={downArrow} />
            </Touchable>
          }></MenuTrigger>
        <MenuOptions>
          {data.map((item, index) => {
            return (
              <MenuOption
                key={index}
                onSelect={() => onSelect(item)}
                style={styles.view}>
                <Text style={styles.text}>{item?.title}</Text>
              </MenuOption>
            );
          })}
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default MenuList;

const styles = StyleSheet.create({
  button: {
    height: 55,
    width: 200,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '3%',
    justifyContent: 'space-between',
    backgroundColor: Colors.fadeBlue,
  },
  view: {
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.blueBar,
  },
  select: {
    width: 175,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.large,
    fontFamily: FontFamily.semiBold,
  },
  time: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
});
