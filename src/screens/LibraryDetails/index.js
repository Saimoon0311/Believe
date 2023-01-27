import React, {useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {normal} from '@/Assets/lottie';
import AudioCard from '@/components/AudioCard';
import PageHeading from '@/components/PageHeading';
import useLibraryDetails from './useLibraryDetails';
import EmptyComponent from '@/components/EmptyComponent';
import {styles} from './styles';
import {keyExtractor} from '@/utils/helper';
import AnimatedBackground from '@/components/AnimatedBackground';

const LibraryDetails = ({navigation, route}) => {
  const {data, allLibAudios, libraryDetail, onRefresh} = useLibraryDetails(
    navigation,
    route,
  );

  const renderItem = useCallback(
    ({item}) => <AudioCard {...{item, data, onPress: libraryDetail}} />,
    [allLibAudios],
  );

  return (
    <AnimatedBackground animation={normal}>
      <PageHeading {...{title: data?.name, navigation, backButton: true}} />
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          refreshing={false}
          data={allLibAudios}
          onRefresh={onRefresh}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={
            <EmptyComponent
              title="Ooopss!"
              fullScreen={true}
              description={data?.name}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(LibraryDetails);
