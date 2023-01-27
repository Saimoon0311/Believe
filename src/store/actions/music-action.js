import sagaTypes from '../saga-types';

export const playMusic = payload => ({
  type: sagaTypes.addAudio_Dispatch,
  payload,
});
export const removeMusic = payload => ({
  type: sagaTypes.removeAudio_Dispatch,
  payload,
});

export const toggleMusic = payload => ({
  type: sagaTypes.toggleAudio_Dispatch,
  payload,
});
