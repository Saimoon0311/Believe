import React, {useCallback} from 'react';
import {View, FlatList} from 'react-native';
import EmptyComponent from '@/components/EmptyComponent';
import {keyExtractor} from '@/utils/helper';
import MenuReview from '@/components/MenuReview';
import SeriesCard from '@/components/SeriesCard';
import useSeriesDetails from './useSeriesDetails';
import {normal} from '@/Assets/lottie';
import {styles} from './styles';
import AnimatedBackground from '@/components/AnimatedBackground';

const SeriesDetails = ({navigation, route}) => {
  const {
    data,
    allCatVideos,
    visible,
    hideMenu,
    showMenu,
    videoDetail,
    onRefresh,
    viewReviews,
  } = useSeriesDetails(navigation, route);

  const renderItem = useCallback(
    ({item}) => <SeriesCard {...{item, data, onPress: videoDetail}} />,
    [allCatVideos],
  );

  return (
    <AnimatedBackground animation={normal}>
      <MenuReview
        {...{
          title: data?.name,
          visible,
          hideMenu,
          showMenu,
          navigation,
          viewReviews,
        }}
      />
      <View style={styles.container}>
        <FlatList
          refreshing={false}
          data={allCatVideos}
          onRefresh={onRefresh}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={
            <EmptyComponent
              title="Ooopss!"
              fullScreen={true}
              description="Videos"
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(SeriesDetails);
