import Types from '../saga-types';

export const saveFiles = payload => ({
  type: Types.saveFiles,
  payload,
});

export const deleteFiles = payload => ({
  type: Types.deleteFiles,
  payload,
});

export const deleteAll = payload => ({
  type: Types.deleteAll,
  payload,
});

export const updateFiles = payload => ({
  type: Types.Update_files,
  payload,
});
