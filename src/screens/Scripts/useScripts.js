import {useEffect} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {getAllScripts} from '@/store/actions/content-action';

const useScripts = ({navigate}, {params}) => {
  const {getState, dispatch} = useReduxStore();
  const {allScripts} = getState('Content');

  const scriptDetail = params => navigate('ScriptDetails', params);

  const onRefresh = () => dispatch(getAllScripts());

  useEffect(() => {
    onRefresh();
  }, []);

  const data = params;

  return {data, allScripts, scriptDetail, onRefresh};
};

export default useScripts;
