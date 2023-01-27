import React, {useRef} from 'react';
import {View, Text, Image} from 'react-native';
import {Colors, modalStyles, overlayStyle, Sizes} from '@/theme/Variables';
import ContentDescription from '@/components/ContentDescription';
import ContentFavorite from '@/components/ContentFavorite';
import PlaylistOption from '@/components/PlaylistOption';
import BlurBackground from '@/components/BlurBackground';
import AddPlaylist from '@/components/AddPlaylist';
import {Modalize} from 'react-native-modalize';
import AddOption from '@/components/AddOption';
import useMusicPlayer from './useMusicPlayer';
import SafeView from '@/components/SafeView';
import {contentTime} from '@/utils/helper';
import {styles} from './styles';
import {Slider} from '@miblanchard/react-native-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {FreeUserControls} from './freeUserControls';
import {PaidUserControls} from './paidUserControls';
import {heightPercentageToDP} from 'react-native-responsive-screen';

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
    imageDownload,
    position,
    duration,
    currentAudioposition,
    play,
    checkParamsType,
    index,
    isSubscribed,
    loop,
    isPlayAble,
    cancelDownloadFun,
    onCancel,
    onIconClose,
    onPlaylistOpen,
    onPlaylistClose,
    onAddOpen,
    onAddClose,
    onSubmit,
    handleSubmit,
    updateFavorite,
    startDownload,
    onSlide,
    backwardAudio,
    forwardAudio,
    setSound,
    previousAudio,
    nextAudio,
    runOnLoop,
  } = useMusicPlayer(navigation, route);
  const infoRef = useRef(null);
  const {isSeries} = route?.params;
  const data = valuedata;
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
          {/* XXXXXXXXXXXXXXXXXXXXXXXXXXX MusicTest File code XXXXXXXXXXXXXXXXXX */}
          <View style={styles.listContainer}>
            <View>
              <View style={styles.card}>
                <Text style={styles.name} numberOfLines={2}>
                  {data?.name || data?.title}
                </Text>
                <Text style={styles.category} numberOfLines={1}>
                  {data?.category?.name}
                </Text>
                <Text style={styles.category} numberOfLines={1}>
                  {data?.type?.charAt(0)?.toUpperCase() + data?.type?.slice(1)}
                </Text>
                <Text style={styles.time}>{contentTime(duration)}</Text>
              </View>
              <Slider
                thumbStyle={styles.thumb}
                value={currentAudioposition}
                onSlidingComplete={onSlide}
                thumbTintColor={Colors.white}
                containerStyle={styles.slider}
                minimumTrackTintColor={Colors.white}
                maximumTrackTintColor={Colors.blurWhite1}
                disabled={!isSubscribed}
              />
              <View style={styles.rowEnd}>
                <Text style={styles.position}>{contentTime(position)}</Text>
                <Text style={styles.duration}>{contentTime(duration)}</Text>
              </View>
              <Text style={styles.description} numberOfLines={1}>
                {/* {data?.description} */}
              </Text>
              <View style={styles.row}>
                <FontAwesome
                  size={5}
                  name="circle"
                  color={Colors.white}
                  style={{paddingHorizontal: 6}}
                />
                <Text
                  style={[styles.date, {marginVertical: 20}]}
                  numberOfLines={1}>
                  {moment(data?.created_at).format('MMM DD, YYYY')}
                </Text>
              </View>
            </View>
            {isSubscribed ? (
              <PaidUserControls
                {...{
                  checkParamsType,
                  infoRef,
                  previousAudio,
                  setSound,
                  play,
                  nextAudio,
                  onPlaylistOpen,
                  isSeries,
                  index,
                  backwardAudio,
                  forwardAudio,
                  runOnLoop,
                  loop,
                  isPlayAble,
                }}
              />
            ) : (
              <FreeUserControls
                {...{
                  checkParamsType,
                  infoRef,
                  previousAudio,
                  setSound,
                  play,
                  nextAudio,
                  onPlaylistOpen,
                  isSeries,
                  index,
                  backwardAudio,
                  forwardAudio,
                  runOnLoop,
                  loop,
                  isPlayAble,
                }}
              />
            )}
          </View>
        </View>
        <Modalize
          ref={infoRef}
          withHandle={false}
          modalStyle={modalStyles}
          closeOnOverlayTap={true}
          overlayStyle={overlayStyle}
          modalHeight={Sizes.height * 0.7}>
          <View style={{padding: 20}}>
            {/* <Text
              style={[
                styles.title,
                {fontSize: 28, textAlign: 'center', marginBottom: 20},
              ]}>
              Description
            </Text> */}
            <Text
              style={[
                styles.title,
                {
                  textAlign: 'justify',
                  lineHeight: 30,
                  fontSize: heightPercentageToDP('2'),
                },
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
          disableScrollIfPossible
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

// {/* onPress={!addToPlaylist && onIconOpen}> */}
