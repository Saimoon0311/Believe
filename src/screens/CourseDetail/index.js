import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ContentHeading from '@/components/ContentHeading';
import CategoryImage from '@/components/CategoryImage';
import CollapsibleAccordion from '@/components/CollapsibleAccordion';
import EmptyComponent from '@/components/EmptyComponent';
import {normal} from '@/Assets/lottie';
import useCourseDetail from './useCourseDetail';
import {styles} from './styles';
import AnimatedBackground from '@/components/AnimatedBackground';

const CourseDetail = ({navigation, route}) => {
  /* Destructuring the useCourseDetail hook. */
  const {
    data,
    activeTab,
    allCourseLessons,
    onRefresh,
    showPage,
    viewReviews,
    toggleTab,
  } = useCourseDetail(navigation, route);

  return (
    <AnimatedBackground animation={normal}>
      <ContentHeading {...{title: data?.title, navigation, backButton: true}} />
      <View style={styles.container}>
        <CategoryImage {...{data, viewReviews}} />
        <View style={styles.tabContainer}>
          {/* <TabButton active={!activeTab} onPress={toggleTab} title="Lessons" />
          <TabButton active={activeTab} onPress={toggleTab} title="Ratings" /> */}
        </View>

        <CollapsibleAccordion
          {...{showPage, onRefresh, data: allCourseLessons}}
        />

        {/* {!activeTab && (
          <CollapsibleAccordion
            {...{showPage, onRefresh, data: allCourseLessons}}
          />
        )} */}
        {!Boolean(allCourseLessons?.length) && (
          <EmptyComponent
            title="Ooopss!"
            fullScreen={true}
            description="Courses"
            onRefresh={onRefresh}
          />
        )}
      </View>
    </AnimatedBackground>
  );
};

const TabButton = ({title, onPress, active}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    disabled={active}
    style={styles.tabButton(active)}>
    <Text style={styles.subHeading}>{title}</Text>
  </TouchableOpacity>
);

export default CourseDetail;
