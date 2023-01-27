import React, {useCallback} from 'react';
import {View, Image, FlatList} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {normal} from '@/Assets/lottie';
import {
  addPlaylist,
  autoplay,
  noLoop,
  pauseButton,
  playButton,
} from '@/Assets/Images';
import usePlaylistDetails from './usePlaylistDetails';
import PlayListContent from '@/components/PlayListContent';
import PlaylistCard from '@/components/PlaylistCard';
import {Touchable} from '@/components/Touchable';
import MenuHeader from '@/components/MenuHeader';
import {styles} from './styles';
import {keyExtractor} from '@/utils/helper';
import AnimatedBackground from '@/components/AnimatedBackground';

const PlaylistDetails = ({navigation, route}) => {
  const {
    data,
    playlist,
    visible,
    playlistAudios,
    contentID,
    isPlaying,
    loop,
    trackIndex,
    position,
    hideMenu,
    hideDelete,
    showMenu,
    showDelete,
    onSelect,
    editPlaylist,
    deletePlaylist,
    playAudio,
    onRefresh,
    goAudioBack,
    runOnLoop,
    onSort,
  } = usePlaylistDetails(navigation, route);

  const renderItem = useCallback(
    props => (
      <PlayListContent
        {...{
          data,
          playAudio,
          hideDelete,
          showDelete,
          onSelect,
          contentID,
          trackIndex,
          position,
          isPlaying,
          ...props,
        }}
      />
    ),
    [playlistAudios, trackIndex, isPlaying, contentID],
  );
  const isPlayAble = Boolean(playlistAudios?.length);

  return (
    <AnimatedBackground animation={normal}>
      <MenuHeader
        {...{
          visible,
          hideMenu,
          showMenu,
          editPlaylist,
          deletePlaylist,
          goAudioBack,
          onSort,
        }}
      />
      <View style={styles.center}>
        <PlaylistCard {...{item: playlist, disable: true}} />
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <Image style={styles.hide} source={autoplay} />
          <Touchable
            style={styles.playButton}
            onPress={() => playAudio(0)}
            disabled={!isPlayAble}
            Opacity={0.7}>
            <Image
              style={styles.play}
              source={isPlaying ? pauseButton : playButton}
            />
          </Touchable>
          <Touchable
            onPress={() =>
              navigation.navigate('AddPlayListData', {
                PlaylistCard: route.params,
                audioList: playlistAudios,
              })
            }
            activeOpacity={0.7}
            style={styles.playButton}>
            <Image source={addPlaylist} style={styles.icon} />
          </Touchable>
          <Touchable disabled={true} Opacity={0} onPress={runOnLoop}>
            <Image style={styles.autoplay} source={loop ? autoplay : noLoop} />
          </Touchable>
        </View>
        <FlatList
          refreshing={false}
          onRefresh={onRefresh}
          data={playlistAudios || []}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            // height: '85%',
          }}
          // onDragEnd={updateSortArray}
        />
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(PlaylistDetails);
