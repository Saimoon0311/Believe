import {useEffect, useRef, useReducer} from 'react';
import API from '@/services/API';
import {initialState, reducer} from './reducer';
import useReduxStore from '@/hooks/useReduxStore';

const useLibrary = ({navigate}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const modalizeRef = useRef(null);
  const listRef = useRef(null);
  const {marked} = state;

  const requestParam = params => ({
    ...params,
    requestParam: state?.request_url,
  });
  const {getState} = useReduxStore();

  const {user} = getState('Auth');
  const isSubscript = Boolean(user?.is_subscribed);
  const onOpen = () => modalizeRef.current?.open();
  const onClose = filter => modalizeRef.current?.close();
  const onPressSearchBar = () => navigate('Search');
  const courseDetail = params => navigate('CourseDetail', params);
  const libraryDetail = params =>
    navigate(marked?.page_url, requestParam(params));

  const seriesDetail = params =>
    navigate('SeriesDetails', requestParam(params));

  const eBookDetail = params =>
    navigate('DownloadContent', requestParam(params));

  const onRefresh = async (param, id = '') => {
    const route = param || marked?.name;
    const {data} = await API.get(
      `/all-content?content_type=${route.toLowerCase()}&course_cat_id=${
        id || state?.selectedCategory?.id || ''
      }`,
    );
    dispatch({
      type: 'update_Reducer',
      payload: {
        [route]: data[route.toLowerCase()],
        request_url: data?.request_url,
        categories: data?.categories || state?.categories || [],
        ...(Boolean(state?.selectedCategory == '' && route == 'Courses') && {
          selectedCategory: data?.categories[0],
        }),
      },
    });
  };

  const updateAndRoute = obj => {
    if (obj?.id == marked.id) return;
    else onRefresh(obj?.name || marked?.name);
    listRef.current?.scrollToOffset({animated: true, offset: 0});
    dispatch({
      type: 'update_Reducer',
      payload: {marked: obj},
    });
  };

  const updateCourseCategory = selectedCategory => {
    if (selectedCategory?.id == state?.selectedCategory?.id) return;
    dispatch({type: 'update_Reducer', payload: {selectedCategory}});
    onRefresh(marked?.name, selectedCategory?.id);
  };

  useEffect(() => {
    onRefresh(marked?.name);
  }, []);

  return {
    state,
    listRef,
    modalizeRef,
    isSubscript,
    onOpen,
    onPress: onPressSearchBar,
    onClose,
    onRefresh,
    eBookDetail,
    courseDetail,
    seriesDetail,
    libraryDetail,
    updateAndRoute,
    updateCourseCategory,
  };
};

export default useLibrary;
