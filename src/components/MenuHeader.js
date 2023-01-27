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

const MenuHeader = ({
  visible,
  hideMenu,
  showMenu,
  editPlaylist,
  deletePlaylist,
  goAudioBack,
  onSort,
}) => {
  return (
    <View style={styles.container}>
      <Touchable Opacity={0.7} onPress={goAudioBack}>
        <Image source={back} style={styles.back} />
      </Touchable>
      <Menu opened={visible} onBackdropPress={hideMenu}>
        <MenuTrigger
          children={
            <Touchable style={{padding: 5}} onPress={showMenu}>
              <SimpleLineIcons
                size={20}
                name="options-vertical"
                color={Colors.white}
              />
            </Touchable>
          }></MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={onSort} style={styles.button}>
            <Text style={styles.text}>Rearrange Playlist</Text>
          </MenuOption>
          <MenuOption onSelect={editPlaylist} style={styles.button}>
            <Text style={styles.text}>Edit Playlist</Text>
          </MenuOption>
          <MenuOption onSelect={deletePlaylist} style={styles.button}>
            <Text style={styles.text}>Delete Playlist</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default React.memo(MenuHeader);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: 40,
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
});
