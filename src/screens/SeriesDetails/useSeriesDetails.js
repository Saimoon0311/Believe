import {useEffect, useState} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {getAllVideos, handleAppStreak} from '@/store/actions/content-action';

const useSeriesDetails = (navigation, {params}) => {
  const [visible, setVisible] = useState(false);
  const data = params;
  const {getState, dispatch} = useReduxStore();
  const {allCatVideos} = getState('Content');

  const viewReviews = () => {
    hideMenu();
    navigation.navigate('Reviews', {
      ...data,
      requestParam: `series-reviews?series_id=${data?.id}`,
      value: 'series_id',
      sendRequest: 'add-series-review',
    });
  };

  const videoDetail = params => {
    if (params?.type == 'audio') {
      dispatch(handleAppStreak());
      navigation.navigate('MusicPlayer', {...params, isSeries: true});
    } else navigation.navigate('VideoContent', params);
  };
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const onRefresh = _ =>
    dispatch(getAllVideos({id: data?.id, requestParam: params?.requestParam}));

  useEffect(() => {
    onRefresh();
  }, []);

  return {
    data,
    allCatVideos,
    visible,
    hideMenu,
    showMenu,
    videoDetail,
    onRefresh,
    viewReviews,
  };
};

export default useSeriesDetails;
