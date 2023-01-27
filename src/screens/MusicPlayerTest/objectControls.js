import {
  addPlaylist,
  backward,
  forward,
  help,
  pauseButton,
  playButton,
} from '@/Assets/Images';
import AddPlaylist from '@/components/AddPlaylist';
import {Touchable} from '@/components/Touchable';
import {Colors} from '@/theme/Variables';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './styles';

export const ObjectControls = ({
  infoRef,
  setSound,
  play,
  onPlaylistOpen,
  isSeries,
  backwardAudio,
  forwardAudio,
}) => {
  return (
    <View style={styles.controllers}>
      <Touchable
        style={styles.buttonSmall}
        onPress={() => infoRef.current.open()}
        Opacity={0.7}>
        <Image style={styles.cornerButton} source={help} />
      </Touchable>
      <View style={styles.center}>
        <Touchable
          Opacity={0.7}
          onPress={backwardAudio}
          style={styles.buttonMedium}>
          <Image style={styles.centerButton} source={backward} />
        </Touchable>
        <Touchable Opacity={0.7} style={styles.button} onPress={setSound}>
          <Image
            style={styles.playerButton}
            source={play ? pauseButton : playButton}
          />
        </Touchable>
        <Touchable
          Opacity={0.7}
          onPress={forwardAudio}
          style={styles.buttonMedium}>
          <Image style={styles.centerButton} source={forward} />
        </Touchable>
      </View>
      <Touchable
        disabled={Boolean(isSeries)}
        Opacity={0.7}
        style={styles.buttonSmall}
        onPress={onPlaylistOpen}>
        <Image
          style={[
            styles.cornerButton,
            {
              tintColor: isSeries ? Colors.transparent : Colors.white,
              opacity: isSeries ? 0 : 1,
            },
          ]}
          source={addPlaylist}
        />
      </Touchable>
    </View>
  );
};
