import React, {useCallback} from 'react';
import {View, FlatList, ScrollView, Image, Alert} from 'react-native';
import {Modalize} from 'react-native-modalize';
import CategoryCard from '@/components/CategoryCard';
import TimeFilterModal from '@/components/TimeFilterModal';
import PageHeading from '@/components/PageHeading';
import FilterTime from '@/components/FilterTime';
import SearchFilter from '@/components/SearchFilter';
import {contentDataList, libraryFilterModalData} from '@/utils/helper/LocalDb';
import {clock, VIPCard} from '@/Assets/Images';
import {modalStyles, overlayStyle, Sizes} from '@/theme/Variables';
import EmptyComponent from '@/components/EmptyComponent';
import FilterCard from '@/components/FilterCard';
import useLibrary from './useLibrary';
import {styles} from './styles';
import {keyExtractor} from '@/utils/helper';
import AnimatedBackground from '@/components/AnimatedBackground';
import ContentCard from '@/components/ContentCard';
import CourseListCard from '@/components/CourseListCard';
import ScriptCard from '@/components/ScriptCard';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Touchable} from '@/components/Touchable';

const Library = ({navigation}) => {
  const {
    modalizeRef,
    state,
    listRef,
    isSubscript,
    onOpen,
    onClose,
    onRefresh,
    eBookDetail,
    courseDetail,
    seriesDetail,
    libraryDetail,
    updateAndRoute,
    updateCourseCategory,
    onPress,
  } = useLibrary(navigation);

  const {marked, categories, selectedCategory} = state;
  const isCourses = Boolean(marked?.name == 'Courses');
  const renderItem = useCallback(
    ({item, index}) => {
      const isBook = Boolean(marked?.name == 'EBooks');
      if (isCourses)
        return <CourseListCard key={index} {...{item, courseDetail}} />;
      if (['Series', 'EBooks'].includes(marked?.name))
        return (
          <ScriptCard
            key={index}
            {...{
              item,
              title: isBook ? 'eBooks' : 'series',
              onPress: isBook ? eBookDetail : seriesDetail,
            }}
          />
        );
      return <CategoryCard key={index} {...{item, marked, libraryDetail}} />;
    },
    [marked, state[marked?.name]],
  );

  const renderContentTypeItem = useCallback(
    (item, index) => (
      <ContentCard
        key={index}
        {...{item, updateCourseCategory, selected: selectedCategory}}
      />
    ),
    [selectedCategory],
  );

  return (
    <AnimatedBackground>
      <PageHeading {...{title: 'Library'}} />
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <SearchFilter
            onPress={onPress}
            {...{
              name: 'search',
              placeholder: 'Search',
              isRequired: true,
              editable: false,
            }}
          />
          <FilterTime {...{onOpen, icon: clock}} />
        </View>
        <View style={styles.topWidth}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {contentDataList.map((item, index) => (
              <FilterCard
                key={index}
                {...{item, marked, onPress: updateAndRoute}}
              />
            ))}
          </ScrollView>
        </View>
        {marked?.name == 'Courses' && !isSubscript && (
          <Touchable onPress={() => navigation.navigate('Subscription')}>
            <Image
              resizeMode="contain"
              style={{
                alignSelf: 'center',
                marginTop: heightPercentageToDP('2'),
              }}
              source={VIPCard}
            />
          </Touchable>
        )}
        <View style={styles.subContainer}>
          {Boolean(categories.length && marked?.name == 'Courses') && (
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories?.map(renderContentTypeItem)}
              </ScrollView>
            </View>
          )}
          <FlatList
            key={isCourses}
            numColumns={isCourses ? 1 : 2}
            refreshing={false}
            onRefresh={onRefresh}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            data={state[marked?.name] || []}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            ref={listRef}
            ListEmptyComponent={
              <EmptyComponent
                title="Ooopss!"
                padding={true}
                description={marked?.name}
                onRefresh={onRefresh}
              />
            }
          />
        </View>
      </View>
      <Modalize
        ref={modalizeRef}
        withHandle={false}
        modalStyle={modalStyles}
        closeOnOverlayTap={true}
        modalHeight={Sizes.height * 0.55}
        overlayStyle={overlayStyle}>
        <TimeFilterModal
          {...{data: libraryFilterModalData, filterData: {}, onClose}}
        />
      </Modalize>
    </AnimatedBackground>
  );
};

export default React.memo(Library);
