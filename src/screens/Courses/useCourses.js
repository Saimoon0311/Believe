import {useEffect} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {getAllCourses} from '@/store/actions/content-action';

const useCourses = ({navigate, addListener}, {params}) => {
  const {getState, dispatch} = useReduxStore();
  const {allCourses} = getState('Content');
  const {user} = getState('Auth');

  const courseDetail = params => navigate('CourseDetail', params);

  const onRefresh = () => dispatch(getAllCourses());

  useEffect(() => {
    const event = addListener('focus', onRefresh);
    return event;
  }, []);

  return {data: params, allCourses, courseDetail, onRefresh, user};
};

export default useCourses;
