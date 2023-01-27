// import React from 'react';
// import {View, ImageBackground} from 'react-native';
// import SafeView from '@/components/SafeView';
// import {background, fadedBackground} from '@/Assets/Images';
// import ContentHeading from '@/components/ContentHeading';
// import ContentDescription from '@/components/ContentDescription';
// import AudioPlayer from '@/components/AudioPlayer';
// import useAudioContent from './useAudioContent';
// import Overlay from '@/components/Overlay';
// import {styles} from './styles';

// const AudioContent = ({navigation, route}) => {
//   const {data, isTrackPlayerInit, hideLoader} = useAudioContent({
//     navigation,
//     route,
//   });

//   return (
//     <>
//       {!isTrackPlayerInit && <Overlay />}
//       <ImageBackground source={background} style={styles.backgroundImage}>
//         <SafeView>
//           <ContentHeading
//             {...{title: data?.title, navigation, backButton: true}}
//           />
//           <View style={styles.container}>
//             <ContentDescription {...{data, audio: true}} />
//             <AudioPlayer {...{data, hideLoader}} />
//           </View>
//         </SafeView>
//       </ImageBackground>
//     </>
//   );
// };

// export default React.memo(AudioContent);

import React from 'react';
import {View, ImageBackground} from 'react-native';
import SafeView from '@/components/SafeView';
import {background, fadedBackground, player} from '@/Assets/Images';
import ContentFavorite from '@/components/ContentFavorite';
import Overlay from '@/components/Overlay';
import {Modalize} from 'react-native-modalize';
import {modalStyles, overlayStyle, Sizes} from '@/theme/Variables';
import AddOption from '@/components/AddOption';
import PlaylistOption from '@/components/PlaylistOption';
import AddPlaylist from '@/components/AddPlaylist';
import useAudioContent from './useAudioContent';
import ContentDescription from '@/components/ContentDescription';
import ContentHeading from '@/components/ContentHeading';
import Music from '@/components/Music';
import {styles} from './styles';
import BlurBackground from '@/components/BlurBackground';

const AudioContent = ({navigation, route}) => {
  const {
    data,
    valuedata,
    modalizeRef,
    playlistRef,
    addPlaylistRef,
    errors,
    control,
    isTrackPlayerInit,
    playlistData,
    onCancel,
    onIconOpen,
    onIconClose,
    onPlaylistOpen,
    onPlaylistClose,
    onAddOpen,
    onAddClose,
    hideLoader,
    onSubmit,
    handleSubmit,
    updateFavorite,
  } = useAudioContent({
    navigation,
    route,
  });

  return (
    <>
      {/* {!isTrackPlayerInit && <Overlay />} */}
      {/* <ImageBackground source={player} style={styles.backgroundImage}> */}
      <BlurBackground
        uri={valuedata?.cover_image}
        styles={styles.backgroundImage}
        blurhash={valuedata?.cover_hash_code}>
        <SafeView>
          <ContentFavorite
            {...{
              data,
              valuedata,
              navigation,
              onPress: updateFavorite,
              addToPlaylist: true,
            }}
          />
          <View style={styles.container}>
            <ContentDescription {...{data, audio: true}} />
            <Music
              {...{
                data: valuedata,
                hideLoader,
                onIconOpen,
                addToPlaylist: true,
              }}
            />
          </View>
          <Modalize
            ref={modalizeRef}
            withHandle={false}
            modalStyle={modalStyles}
            closeOnOverlayTap={true}
            overlayStyle={overlayStyle}
            // adjustToContentHeight={true}
            modalHeight={Sizes.height * 0.9}>
            <AddOption
              {...{
                title: data?.title,
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
            // adjustToContentHeight={true}
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
            // adjustToContentHeight={true}
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
    </>
  );
};

export default React.memo(AudioContent);
