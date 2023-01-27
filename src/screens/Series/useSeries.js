import {useEffect} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {getAllSeries} from '@/store/actions/content-action';

const useSeries = ({navigation: {navigate}, route}) => {
  const {getState, dispatch} = useReduxStore();
  const {allSeries} = getState('Content');

  const seriesDetail = params => navigate('SeriesDetails', params);

  const onRefresh = () => dispatch(getAllSeries());

  useEffect(() => {
    onRefresh();
  }, []);

  const data = route.params;

  return {data, allSeries, seriesDetail, onRefresh};
};

export default useSeries;
