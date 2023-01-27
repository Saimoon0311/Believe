import {useEffect, useRef, useState} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {getContentLibraries} from '@/store/actions/content-action';
import {contentDataList} from '@/utils/helper/LocalDb';

const useLibrary = ({navigate}) => {
  const {getState, dispatch} = useReduxStore();
  const {contentLibraries} = getState('Content');
  const [filterData, setFilterData] = useState({id: 7});
  const [searchs, setSearch] = useState('');
  const [categoryFilterData, setCategoryFilterData] =
    useState(contentLibraries);
  const [marked, setMarked] = useState(contentDataList[0]);

  const libraryDetail = params => navigate(marked?.page_url, params);
  const videoDetail = params => navigate('VideoDetails', params);
  const contentDetail = params => navigate(params, params);

  const modalizeRef = useRef(null);

  const onOpen = () => modalizeRef.current?.open();
  function searchFun(e) {
    var text = e;
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = contentLibraries.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setCategoryFilterData(newData);
      setSearch(text);
    } else {
      setCategoryFilterData(contentLibraries);
      setSearch(text);
    }
  }
  const onFilterSelect = (min, max) => {
    const getMax = Boolean(max != undefined);
    return contentLibraries.filter(i => {
      const timeCat = Number(Math.floor(i?.duration));
      return getMax ? timeCat >= min && timeCat <= max : timeCat >= min;
    });
  };

  const onClose = filter => {
    setFilterData({id: filter?.id});
    const min = filter?.min;
    const max = filter?.max;
    const stringTimeMax = Boolean(typeof max == 'string');
    const stringTimeAll = Boolean(typeof min && max == 'string');
    if (stringTimeAll) setCategoryFilterData(contentLibraries);
    else if (stringTimeMax) setCategoryFilterData(onFilterSelect(min));
    else setCategoryFilterData(onFilterSelect(min, max));
    modalizeRef.current?.close();
  };

  const onRefresh = param => {
    setFilterData({id: 7});
    dispatch(getContentLibraries(param || marked.request));
    setCategoryFilterData(contentLibraries);
  };

  const updateAndRoute = obj => {
    setFilterData({id: 7});
    if (obj?.id == marked.id) return;
    if (obj?.page) contentDetail(obj?.request);
    else onRefresh(obj?.request);
    // setMarked(obj);
    setMarked({
      page: obj?.page,
      id: obj?.page ? marked?.id : obj?.id,
      request: obj?.page ? marked?.request : obj?.request,
      page_url: obj?.page_url || marked?.page_url,
      name: obj?.name,
    });
  };

  useEffect(() => onRefresh(contentDataList[0]?.request), []);

  useEffect(() => {
    setCategoryFilterData(contentLibraries);
  }, [marked, contentLibraries]);

  return {
    contentLibraries,
    modalizeRef,
    marked,
    filterData,
    categoryFilterData,
    setMarked,
    onRefresh,
    libraryDetail,
    videoDetail,
    onOpen,
    onClose,
    updateAndRoute,
    search: searchFun,
    searchs,
    isSubscript,
  };
};

export default useLibrary;
