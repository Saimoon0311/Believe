import React, {useCallback} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import PageHeading from '@/components/PageHeading';
import FilterTime from '@/components/FilterTime';
import SearchFilter from '@/components/SearchFilter';
import {contentTypeData} from '@/utils/helper/LocalDb';
import {filter} from '@/Assets/Images';
import ContentCard from '@/components/ContentCard';
import CourseListCard from '@/components/CourseListCard';
import VIPCard from '@/components/VIPCard';
import useCourses from './useCourses';
import {styles} from './styles';
import EmptyComponent from '@/components/EmptyComponent';
import {keyExtractor} from '@/utils/helper';
import {normal} from '@/Assets/lottie';
import AnimatedBackground from '@/components/AnimatedBackground';

const Courses = ({navigation, route}) => {
  const {allCourses, courseDetail, onRefresh, user} = useCourses(
    navigation,
    route,
  );
  const renderContentTypeItem = (item, index) => (
    <ContentCard key={index} {...{item, index}} />
  );

  const renderItem = useCallback(
    ({item, index}) => <CourseListCard {...{item, index, courseDetail}} />,
    [allCourses],
  );

  const title = route?.params;
  const isSubscribed = Boolean(user?.is_subscribed);
  return (
    <AnimatedBackground animation={normal}>
      <PageHeading {...{title, navigation, backButton: true}} />
      <View style={styles.container}>
        {!isSubscribed && (
          <VIPCard
            {...{
              title: 'Upgrade to VIP',
              subTitle: 'Become a VIP Member to get access to Online Courses !',
            }}
          />
        )}
        <View style={styles.mainContainer}>
          <SearchFilter
            {...{
              name: 'search',
              isRequired: true,
              placeholder: 'Search',
            }}
          />
          <FilterTime {...{onOpen: null, icon: filter, color: true}} />
        </View>
        <View style={{width: '100%', paddingTop: 20}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {contentTypeData?.map(renderContentTypeItem)}
          </ScrollView>
        </View>
        <View style={styles.subContainer}>
          <FlatList
            bounces={false}
            refreshing={false}
            data={allCourses}
            onRefresh={onRefresh}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            // ListEmptyComponent={
            //   <EmptyComponent
            //     title="Ooopss!"
            //     padding={true}
            //     description="Courses"
            //     onRefresh={onRefresh}
            //   />
            // }
          />
        </View>
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(Courses);
