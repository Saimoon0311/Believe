import {normal} from '@/Assets/lottie';
import AnimatedBackground from '@/components/AnimatedBackground';
import PageHeading from '@/components/PageHeading';
import PlayListContent from '@/components/PlayListContent';
import ShareButton from '@/components/ShareButton';
import {Colors} from '@/theme/Variables';
import {keyExtractor} from '@/utils/helper';
import React from 'react';
import {useCallback} from 'react';
import {View, Text} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import useSortPlaylist from './useSortPlaylist';

const SortPlaylist = ({navigation, route}) => {
  const {
    data,
    playlistAudios,
    contentID,
    isPlaying,
    trackIndex,
    position,
    hideDelete,
    showDelete,
    onSelect,
    onRefresh,
    updateSortArray,
    saveSort,
    updateArry,
  } = useSortPlaylist(navigation, route);

  const renderItem = useCallback(
    props => (
      <PlayListContent
        {...{
          data,
          playAudio: () => {},
          hideDelete,
          showDelete,
          onSelect,
          contentID,
          trackIndex,
          position,
          isPlaying,
          iconColor: 'transparent',
          ...props,
        }}
      />
    ),
    [playlistAudios, trackIndex, isPlaying, contentID],
  );
  return (
    <AnimatedBackground animation={normal}>
      <PageHeading
        {...{
          title: 'Sort Playlist',
          navigation,
          backButton: true,
          addIcon: true,
        }}
      />
      <View
        style={{
          flex: 1,
          marginHorizontal: '5%',
          marginTop: heightPercentageToDP('2'),
        }}>
        <DraggableFlatList
          refreshing={false}
          onRefresh={onRefresh}
          data={playlistAudios || []}
          scrollEnabled={true}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            // flexGrow: 1,
            // height: '85%',
            paddingBottom: heightPercentageToDP('20'),
          }}
          onDragEnd={updateSortArray}
        />
        {saveSort && (
          <ShareButton
            style={{
              position: 'absolute',
              bottom: heightPercentageToDP('4'),
              backgroundColor: Colors.greenFaded,
            }}
            onPress={updateArry}
            title="Save Changes"
            hide={true}
          />
        )}
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(SortPlaylist);
