import React from 'react';
import {Alert} from 'react-native';
import {ArryControls} from './arryControls';
import {ObjectControls} from './objectControls';

export const FreeUserControls = ({
  checkParamsType,
  infoRef,
  previousAudio,
  setSound,
  play,
  nextAudio,
  onPlaylistOpen,
  isSeries,
  index,
  runOnLoop,
  loop,
  isPlayAble,
}) => {
  return checkParamsType ? (
    <ArryControls
      {...{
        infoRef,
        previousAudio,
        setSound,
        play,
        nextAudio,
        onPlaylistOpen,
        isSeries,
        index,
        runOnLoop,
        loop,
        isPlayAble,
      }}
    />
  ) : (
    <ObjectControls
      {...{
        infoRef,
        backwardAudio: () => {
          Alert.alert('You can not backword');
        },
        forwardAudio: () => {
          Alert.alert('You can not forword');
        },
        setSound,
        play,
        onPlaylistOpen,
        isSeries,
        index,
      }}
    />
  );
};
