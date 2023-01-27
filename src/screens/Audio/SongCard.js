import React from 'react';
import {View, Text, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Slider} from '@miblanchard/react-native-slider';
import {Touchable} from '@/components/Touchable';
import {Colors, Sizes} from '@/theme/Variables';
import {styles} from './styles';

const SongCard = ({
  item,
  index,
  position,
  isPlaying,
  duration,
  buffered,
  play,
  setSound,
  TrackPlayer,
}) => {
  // console.log('first', play);

  // const onSlide = slide => {
  //   audio.seek(slide * duration);
  // };
  const onSlide = async slide => {
    await TrackPlayer.seekTo(slide * duration);
  };

  const showTime = val => {
    // val++;
    let hr = Math.floor(val / 3600);
    let min = Math.floor(val / 60 - hr * 60);
    let sec = Math.floor(val % 60);
    const runTime =
      min.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
    return runTime;
  };
  const timer = time => {
    const runTime = new Date(time * 1000).toLocaleTimeString().substring(3);
    return runTime;
  };

  return (
    <View style={styles.listView}>
      <View style={styles.rowStart}>
        <Image source={item?.image} style={styles.album} />
        <View style={styles.artistList}>
          <View>
            <Text style={styles.name}>{item?.title}</Text>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.artist}>{item?.artist}</Text>
            <Text style={styles.artist}>
              {showTime(position)} / {showTime(duration)}
            </Text>
          </View>
          <Slider
            value={position / duration}
            containerStyle={{
              height: 15,
              width: Sizes.width * 0.575,
            }}
            onValueChange={onSlide}
            thumbTintColor={Colors.white}
            minimumTrackTintColor={Colors.white}
            // maximumTrackTintColor={Colors.white}
            thumbStyle={{width: 12.5, height: 12.5}}
          />
        </View>
      </View>
      {play ? (
        <Touchable onPress={setSound}>
          <Ionicons name="pause" color={Colors.primaryColor} size={40} />
        </Touchable>
      ) : (
        <Touchable onPress={setSound}>
          <Ionicons name="play-sharp" color={Colors.primaryColor} size={40} />
        </Touchable>
      )}
    </View>
  );
};

export default React.memo(SongCard);
