import {contentDataList} from '@/utils/helper/LocalDb';
export const reducer = (state, action) => {
  if (action.type == 'update_Reducer') return {...state, ...action.payload};
  return state;
};

export const initialState = {
  marked: contentDataList[0],
  Hypnosis: [],
  Meditation: [],
  Affirmations: [],
  Courses: [],
  Series: [],
  Scripts: [],
  Videos: [],
  EBooks: [],
  categories: [],
  request_url: '',
  selectedCategory: '',
};
