import React, {useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {normal} from '@/Assets/lottie';
import EmptyComponent from '@/components/EmptyComponent';
import {keyExtractor} from '@/utils/helper';
import PageHeading from '@/components/PageHeading';
import ScriptCard from '@/components/ScriptCard';
import useEBooks from './useEBooks';
import {styles} from './styles';
import AnimatedBackground from '@/components/AnimatedBackground';

const EBooks = ({navigation, route}) => {
  const {data, allEBooks, eBookDetail, onRefresh} = useEBooks(
    navigation,
    route,
  );

  const renderItem = useCallback(
    ({item}) => (
      <ScriptCard {...{item, data, title: 'eBooks', onPress: eBookDetail}} />
    ),
    [allEBooks],
  );

  return (
    <AnimatedBackground animation={normal}>
      <PageHeading {...{title: 'eBooks', navigation, backButton: true}} />
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          refreshing={false}
          data={allEBooks}
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

export default React.memo(EBooks);
