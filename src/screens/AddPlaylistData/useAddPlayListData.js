import useReduxStore from '@/hooks/useReduxStore';
import API from '@/services/API';
import {
  addAudioPlaylist,
  removeAudioPlaylist,
} from '@/store/actions/content-action';
import {useState} from 'react';

const useAddPlayListData = (navigation, {params}) => {
  const {dispatch, getState} = useReduxStore();
  const {playlistAudios} = getState('Content');
  const [audio, setAudios] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState('');
  const [playlist, setPlaylist] = useState(playlistAudios);

  const getAudios = async url => {
    const {ok, data} = await API.get(url);
    if (ok) {
      setAudios(data?.audios);
      setFilterData(data?.audios);
    } else console.log('data', data);
  };
  const onChange = e => setSearch(e);
  const onSearch = () => {
    getAudios(`search-audios?title=${search}`);
  };
  const onAddPlaylist = item => {
    dispatch(
      addAudioPlaylist({
        type: item?.type,
        audio_id: item?.id,
        playlist_id: params?.PlaylistCard?.id,
      }),
    );
  };
  const onRemovePlaylist = item => {
    dispatch(
      removeAudioPlaylist({
        playlist_id: params?.PlaylistCard?.id,
        type: item?.type,
        audio_id: item?.id,
      }),
    );
  };
  const onRefresh = () => onSearch();

  return {
    audio: filterData,
    onSearch,
    onAddPlaylist,
    onRefresh,
    onRemovePlaylist,
    search,
    AudioList: playlist,
    onChange,
  };
};

export default useAddPlayListData;
