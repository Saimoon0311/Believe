import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MatrialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {minuteCall} from '@/utils/helper';
import BlurImage from './BlurImage';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {playing} from '@/Assets/Images';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const PlayListContent = props => {
  const {
    item,
    index,
    drag,
    isActive,
    playAudio,
    hideDelete,
    showDelete,
    onSelect,
    contentID,
    trackIndex,
    isPlaying,
    iconColor,
  } = props;
  const isSelected = Boolean(
    item?.id == contentID?.audio_id && item?.type == contentID?.type,
  );
  const playingIndex = index == trackIndex && isPlaying;

  return (
    <TouchableOpacity
      Opacity={0.7}
      style={styles.listView}
      onLongPress={drag}
      onPress={() => playAudio(index)}>
      {drag ? (
        <TouchableOpacity
          style={{width: 40}}
          onLongPress={drag}
          disabled={isActive}>
          {isActive ? (
            <FontAwesome
              size={25}
              color="#fff"
              name="hand-rock-o"
              style={styles.handIcon}
            />
          ) : (
            <MatrialIcons name="drag" color="#fff" size={40} />
          )}
        </TouchableOpacity>
      ) : (
        <FontAwesome
          size={-10}
          color="transparent"
          name="hand-rock-o"
          style={styles.handIcon}
        />
      )}

      <View>
        <BlurImage
          uri={item?.image}
          styles={styles.album}
          blurhash={item?.hash_code}
        />
        {playingIndex && (
          <View style={styles.layer}>
            <Image style={styles.playing} source={playing} />
          </View>
        )}
      </View>

      <View style={styles.artistList}>
        <Text numberOfLines={2} style={styles.name}>
          {item?.name}
        </Text>
        <Text style={styles.artist}>{minuteCall(item?.duration)}s</Text>
      </View>

      <Menu opened={isSelected} onBackdropPress={hideDelete}>
        <MenuTrigger
          children={
            <TouchableOpacity
              style={styles.right}
              disabled={isPlaying}
              onPress={() => showDelete(item)}>
              <SimpleLineIcons
                size={20}
                name="options-vertical"
                color={iconColor || Colors.greenFaded}
              />
            </TouchableOpacity>
          }
        />
        <MenuOptions>
          <MenuOption onSelect={onSelect} style={styles.button}>
            <Text style={styles.text}>Remove From Playlist</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </TouchableOpacity>
  );
};

export default React.memo(PlayListContent);

const styles = StyleSheet.create({
  listView: {
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: Sizes.height * 0.1,
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryFaded,
  },
  album: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  artistList: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  name: {
    width: 200,
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.large,
    fontFamily: FontFamily.medium,
  },
  artist: {
    color: Colors.white,
    fontSize: FontSize.default,
    fontFamily: FontFamily.regular,
    marginRight: 2,
  },
  right: {
    marginRight: widthPercentageToDP('3'),
    padding: 2,
    paddingVertical: heightPercentageToDP('1'),
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
  layer: {
    width: 50,
    height: 50,
    zIndex: 999,
    borderRadius: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray2,
  },
  playing: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  handIcon: {marginLeft: 10},
});
