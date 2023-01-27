import React, {useCallback} from 'react';
import {View, FlatList} from 'react-native';
import PageHeading from '@/components/PageHeading';
import VideoCard from '@/components/VideoCard';
import useVideoDetails from './useVideoDetails';
import {normal} from '@/Assets/lottie';
import {styles} from './styles';
import EmptyComponent from '@/components/EmptyComponent';
import {keyExtractor} from '@/utils/helper';
import AnimatedBackground from '@/components/AnimatedBackground';

const VideoDetails = ({navigation, route}) => {
  const {data, allCatVideos, videoDetail, onRefresh} = useVideoDetails(
    navigation,
    route,
  );
  const renderItem = useCallback(
    ({item}) => <VideoCard {...{item, data, onPress: videoDetail}} />,
    [allCatVideos],
  );

  return (
    <AnimatedBackground animation={normal}>
      <PageHeading {...{title: data?.name, navigation, backButton: true}} />
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

export default React.memo(VideoDetails);
