import React, {useCallback} from 'react';
import {View, FlatList} from 'react-native';
import PageHeading from '@/components/PageHeading';
import AudioCard from '@/components/AudioCard';
import EmptyComponent from '@/components/EmptyComponent';
import {normal} from '@/Assets/lottie';
import useViewAll from './useViewAll';
import {styles} from './styles';
import {keyExtractor} from '@/utils/helper';
import AnimatedBackground from '@/components/AnimatedBackground';

/**
 * It renders a flatlist of audios
 * @returns A function component that returns a view.
 */
const ViewAll = ({navigation, route}) => {
  /* Destructuring the data from the useViewAll hook. */
  const {data, audios, playAudio, onRefresh} = useViewAll(navigation, route);

  /* A callback function that is used to render the items in the flatlist. */
  const renderItem = useCallback(
    ({item}) => <AudioCard {...{item, data, onPress: playAudio}} />,
    [audios],
  );
  /* A short hand for `const title = data.title || '';` */
  const {title} = data || {title: ''};
  return (
    <AnimatedBackground animation={normal}>
      <PageHeading {...{title, navigation, backButton: true}} />
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          refreshing={false}
          onRefresh={onRefresh}
          data={[]}
          // data={audios}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={
            <EmptyComponent
              title="Ooopss!"
              fullScreen={true}
              description={`${title} data not available`}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(ViewAll);
