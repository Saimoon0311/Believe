import useReduxStore from '@/hooks/useReduxStore';
import {logOutUser} from '@/store/actions/auth-action';
import {useState, useEffect} from 'react';
import {
  getRecentlySearch,
  getSuggestedKeyword,
  searching,
} from '@/store/actions/onboard-action';
import {useSelector} from 'react-redux';

const useSearch = ({navigation}) => {
  const {dispatch} = useReduxStore();
  const logOutHandler = () => dispatch(logOutUser());

  const recentSearchData = useSelector(state => state.OnBoard.recentlySearch);
  const suggestKeyword = useSelector(state => state.OnBoard.suggestedSearch);
  const searchingResult = useSelector(state => state.OnBoard.searchingResult);

  const [value, setValue] = useState('');

  const [search, setSearch] = useState('');
  const [SuggestedData, setSuggestedData] = useState([]);
  const [searchingResultData, setsearchingResultData] = useState([]);

  const GoNext = () =>
    search?.length && navigation.navigate('Player', {...data, search});

  const selectKeyword = item => {
    const newsuggestedData = [...SuggestedData];
    const index = newsuggestedData.indexOf(item);
    if (index > -1) {
      newsuggestedData.splice(index, 1);
    } else {
      newsuggestedData.push(item);
    }
    setSuggestedData(newsuggestedData);
    setValue(newsuggestedData.map(item => item.queries).join(' '));
    dispatch(searching(newsuggestedData.map(item => item.queries).join(' ')));
  };

  const playAudio = params =>
    navigation.navigate('MusicPlayer', {...params, isSeries: false});

  const _setSearch = searchText => {
    setSearch(searchText);
    dispatch(searching(searchText));
  };

  const onRefresh = () => {
    dispatch(getSuggestedKeyword());
    dispatch(getRecentlySearch());
    setSearch('');
    setSuggestedData([]);
  };

  const _setResultData = () => {
    setsearchingResultData([]);
    setSuggestedData([]);
    // store.dispatch({ searchingResultData: [] })
  };

  useEffect(() => {
    setsearchingResultData(searchingResult);
  }, [searchingResult]);

  useEffect(() => {
    const event = navigation.addListener('focus', () => onRefresh());
    setSuggestedData([]);
    return event;
  }, []);

  return {
    SuggestedData,
    suggestKeyword,
    recentSearchData,
    search,
    _setSearch,
    searchingResult,
    _setResultData,
    searchingResultData,
    value,
    setValue,
    GoNext,
    selectKeyword,
    logOutHandler,
    playAudio,
  };
};

export default useSearch;
