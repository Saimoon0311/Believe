import {useEffect} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {getAllVideos} from '@/store/actions/content-action';

const useVideoDetails = (navigation, {params}) => {
  const {getState, dispatch} = useReduxStore();
  const {allCatVideos} = getState('Content');
  const videoDetail = params => navigation.navigate('VideoContent', params);

  const onRefresh = _ =>
    dispatch(
      getAllVideos({id: params?.id, requestParam: params?.requestParam}),
    );

  useEffect(() => {
    onRefresh();
  }, []);

  return {data: params, allCatVideos, videoDetail, onRefresh};
};

export default useVideoDetails;
