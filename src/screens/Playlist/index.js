import React, {useCallback} from 'react';
import {View, FlatList} from 'react-native';
import SafeView from '@/components/SafeView';
import {normal} from '@/Assets/lottie';
import PlaylistCard from '@/components/PlaylistCard';
import AddPlaylistHeader from '@/components/AddPlaylistHeader';
import {modalStyles, overlayStyle, Sizes} from '@/theme/Variables';
import AddPlaylist from '@/components/AddPlaylist';
import {Modalize} from 'react-native-modalize';
import usePlaylist from './usePlaylist';
import {styles} from './styles';
import {keyExtractor} from '@/utils/helper';
import AnimatedBackground from '@/components/AnimatedBackground';
import EmptyComponent from '@/components/EmptyComponent';

const Playlist = ({navigation}) => {
  const {
    errors,
    control,
    modalizeRef,
    playlistData,
    onRefresh,
    onSubmit,
    onOpen,
    onClose,
    libraryDetail,
    handleSubmit,
  } = usePlaylist({
    navigation,
  });

  const renderItem = useCallback(
    ({item, index}) => (
      <PlaylistCard {...{item, index, onPress: libraryDetail}} />
    ),
    [playlistData],
  );

  return (
    <AnimatedBackground animation={normal}>
      <AddPlaylistHeader {...{title: 'Playlist', navigation, onOpen}} />
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          refreshing={false}
          data={playlistData}
          onRefresh={onRefresh}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={
            <EmptyComponent
              title="Ooopss!"
              fullScreen={true}
              onRefresh={onRefresh}
              message={'You have not created any playlist yet!'}
            />
          }
        />
      </View>
      <Modalize
        ref={modalizeRef}
        withHandle={false}
        modalStyle={modalStyles}
        closeOnOverlayTap={true}
        overlayStyle={overlayStyle}
        modalHeight={Sizes.height * 0.8}>
        <AddPlaylist
          {...{
            onClose,
            errors,
            control,
            onSubmit,
            handleSubmit,
          }}
        />
      </Modalize>
    </AnimatedBackground>
  );
};

export default React.memo(Playlist);
