import React from 'react';
import {Alert} from 'react-native';
import {ArryControls} from './arryControls';
import {ObjectControls} from './objectControls';

export const PaidUserControls = ({
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
        backwardAudio,
        forwardAudio,
        setSound,
        play,
        onPlaylistOpen,
        isSeries,
        index,
      }}
    />
  );
};
