import {useEffect, useState} from 'react';
/* Importing the ContentService from the content-service.js file. */
import ContentService from '@/services/content-service';

const useCourseDetail = (navigation, {params}) => {
  /* A hook that is used to set the state of the active tab. */
  const [activeTab, setActiveTab] = useState(false);
  /* A hook that is used to set the state of the allCourseLessons. */
  const [allCourseLessons, setAllCourseLessons] = useState([]);

  /**
   * It navigates to the Reviews screen and passes the params object, the requestParam, value, and
   * sendRequest as props
   */
  const viewReviews = () =>
    navigation.navigate('Reviews', {
      ...params,
      requestParam: `course-reviews?course_id=${params?.id}`,
      value: 'course_id',
      sendRequest: 'add-course-review',
    });

  /**
   * It calls the ContentService.allCourseLessons function, which returns a promise, and if the promise
   * resolves, it sets the allCourseLessons state variable to the data returned from the promise
   */
  const onRefresh = async () => {
    try {
      const {ok, data} = await ContentService.allCourseLessons(params?.id);
      if (ok) setAllCourseLessons(data?.lessons);
    } catch (error) {
      console.log('ContentService.allCourseLessons error', error);
    }
  };

  /**
   * If the active tab is true, set it to false. If the active tab is false, set it to true
   */
  const toggleTab = () => setActiveTab(tab => !tab);

  /* Calling the onRefresh function when the component mounts. */
  useEffect(() => {
    onRefresh();
  }, []);

  /**
   * It navigates to the page specified in the `page_route` property of the `param` object, and passes
   * the `param` object as a parameter to the page
   */
  const showPage = param => {
    const route =
      param.page_route == 'AudioContent' ? 'MusicPlayer' : param.page_route;
    navigation.navigate(route, {...params, ...param, isSeries: true});
  };

  /* It returns an object that contains the data, activeTab, allCourseLessons, onRefresh, showPage,
viewReviews, lessonTab, and ratingTab variables. */
  return {
    data: params,
    activeTab,
    allCourseLessons,
    onRefresh,
    showPage,
    viewReviews,
    toggleTab,
  };
};

export default useCourseDetail;
