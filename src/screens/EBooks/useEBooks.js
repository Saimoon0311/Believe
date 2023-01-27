import {useEffect} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {getAllEBooks} from '@/store/actions/content-action';

const useEBooks = ({navigate}, {params}) => {
  const {getState, dispatch} = useReduxStore();
  const {allEBooks} = getState('Content');

  const eBookDetail = params => navigate('DownloadContent', params);

  const onRefresh = () => dispatch(getAllEBooks());

  useEffect(() => {
    onRefresh();
  }, []);

  const data = params;

  return {data, allEBooks, eBookDetail, onRefresh};
};

export default useEBooks;
