import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import {modalStyles, overlayStyle, Sizes} from '@/theme/Variables';
import ContentDescription from '@/components/ContentDescription';
import ContentFavorite from '@/components/ContentFavorite';
import PlaylistOption from '@/components/PlaylistOption';
import BlurBackground from '@/components/BlurBackground';
import AddPlaylist from '@/components/AddPlaylist';
import {Modalize} from 'react-native-modalize';
import AddOption from '@/components/AddOption';
import useMusicPlayer from './useMusicPlayer';
import SafeView from '@/components/SafeView';
import Music from '@/components/Music';
import {styles} from './styles';

const MusicPlayer = ({navigation, route}) => {
  const {
    valuedata,
    modalizeRef,
    playlistRef,
    addPlaylistRef,
    errors,
    control,
    playlistData,
    isDownload,
    isCompleted,
    progressVlaue,
    cancelDownloadFun,
    onCancel,
    onIconOpen,
    onIconClose,
    onPlaylistOpen,
    onPlaylistClose,
    onAddOpen,
    onAddClose,
    onSubmit,
    handleSubmit,
    updateFavorite,
    startDownload,
    imageDownload,
  } = useMusicPlayer(navigation, route);
  const infoRef = useRef(null);
  const {isSeries} = route?.params;
  return (
    <BlurBackground
      uri={valuedata?.cover_image}
      styles={styles.backgroundImage}
      blurhash={valuedata?.cover_hash_code}>
      <SafeView>
        <ContentFavorite
          {...{
            data: valuedata,
            navigation,
            onPress: updateFavorite,
            isSeries,
            startDownload,
            isDownload,
            isCompleted,
            progressVlaue,
            cancelDownloadFun,
            checkFile: false,
            imageDownload,
          }}
        />

        <View style={styles.container}>
          <ContentDescription {...{data: valuedata, audio: true}} />
          <Music
            {...{
              data: valuedata,
              onIconOpen: onPlaylistOpen,
              navigation,
              isSeries,
              infoRef,
            }}
          />
        </View>
        <Modalize
          ref={infoRef}
          withHandle={false}
          modalStyle={modalStyles}
          closeOnOverlayTap={true}
          overlayStyle={overlayStyle}
          modalHeight={Sizes.height * 0.7}>
          <View style={{padding: 20}}>
            <Text
              style={[
                styles.title,
                {fontSize: 28, textAlign: 'center', marginBottom: 20},
              ]}>
              Description
            </Text>
            <Text
              style={[
                styles.description,
                {textAlign: 'justify', lineHeight: 30},
              ]}>
              {valuedata?.description}
            </Text>
          </View>
        </Modalize>
        <Modalize
          ref={modalizeRef}
          withHandle={false}
          modalStyle={modalStyles}
          closeOnOverlayTap={true}
          overlayStyle={overlayStyle}
          modalHeight={Sizes.height * 0.9}>
          <AddOption
            {...{
              data: valuedata,
              title: 'sldkngklsndkl',
              onIconClose,
              onPlaylistOpen,
              onPress: updateFavorite,
            }}
          />
        </Modalize>
        <Modalize
          ref={playlistRef}
          withHandle={false}
          modalStyle={modalStyles}
          closeOnOverlayTap={true}
          overlayStyle={overlayStyle}
          modalHeight={Sizes.height * 0.9}>
          <PlaylistOption
            {...{
              title: 'Add to Playlist',
              playlistData,
              onAddOpen,
              onPlaylistClose,
            }}
          />
        </Modalize>
        <Modalize
          ref={addPlaylistRef}
          withHandle={false}
          modalStyle={modalStyles}
          closeOnOverlayTap={true}
          overlayStyle={overlayStyle}
          modalHeight={Sizes.height * 0.9}>
          <AddPlaylist
            {...{
              onAddClose,
              errors,
              control,
              onSubmit,
              handleSubmit,
              dual: true,
              onPress: onCancel,
            }}
          />
        </Modalize>
      </SafeView>
    </BlurBackground>
  );
};

export default React.memo(MusicPlayer);
