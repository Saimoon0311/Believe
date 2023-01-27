import React, {useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {normal} from '@/Assets/lottie';
import EmptyComponent from '@/components/EmptyComponent';
import PageHeading from '@/components/PageHeading';
import ScriptCard from '@/components/ScriptCard';
import useSeries from './useSeries';
import {styles} from './styles';
import {keyExtractor} from '@/utils/helper';
import AnimatedBackground from '@/components/AnimatedBackground';

const Series = ({navigation, route}) => {
  const {data, allSeries, seriesDetail, onRefresh} = useSeries({
    navigation,
    route,
  });

  const renderItem = useCallback(
    ({item}) => (
      <ScriptCard {...{item, data, title: 'series', onPress: seriesDetail}} />
    ),
    [allSeries],
  );

  return (
    <AnimatedBackground animation={normal}>
      <PageHeading {...{title: 'Series', navigation, backButton: true}} />
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          refreshing={false}
          data={allSeries}
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

export default React.memo(Series);
