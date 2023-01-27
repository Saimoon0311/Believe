import {create} from 'apisauce';
import {baseURL} from '@/config/constants';
import {store} from '@/store/store';
import {logOutUser, updateAuth} from '@/store/actions/auth-action';
import cache from '@/utils/helper/cache';

const API = create({
  baseURL,
  timeout: 15000,
  timeoutErrorMessage: 'Please try Again...',
});

const hideLoaderAPIs = [
  '/playcount',
  '/playlist',
  '/count-streak',
  '/favorite',
  '/goals',
  '/get-all-achievements',
];
// const hideLoaderAPIs = ['/playcount', '/playlist', '/home-content'];

API.addRequestTransform(config => {
  if (!hideLoaderAPIs.includes(config.url))
    store.dispatch(updateAuth({loading: true}));
  const {Auth} = store.getState();
  config.headers = {
    Authorization: `Bearer ${Auth.token}`,
  };
  return config;
});

API.addResponseTransform(response => {
  setTimeout(() => store.dispatch(updateAuth({loading: false})), 500);
  if (response?.originalError?.message == 'Request failed with status code 401')
    store.dispatch(logOutUser());

  return response;
});

const {get} = API;

//^ altering the get()
API.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  if (response.ok) {
    cache.store(url, response.data); //* caching the response
    return response;
  }
  const data = cache.get(url); //* retrieving the data from the cache
  return data ? {ok: true, data} : response;
};

export default API;
