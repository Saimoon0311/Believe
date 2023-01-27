import React, {useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {normal} from '@/Assets/lottie';
import PageHeading from '@/components/PageHeading';
import FavoriteData from '@/components/FavoriteData';
import Heading from '@/components/Headings';
import useFavorites from './useFavorites';
import {styles} from './styles';
import EmptyComponent from '@/components/EmptyComponent';
import {keyExtractor} from '@/utils/helper';
import AnimatedBackground from '@/components/AnimatedBackground';

const Favorites = ({navigation, route}) => {
  /* Destructuring the data from the useFavorites hook. */
  const {data, allFavorites, onRefresh, playAudio, onRemove} = useFavorites(
    navigation,
    route,
  );

  /* A callback function that is used to render the data in the FlatList. */
  const renderItem = useCallback(
    ({item}) => <FavoriteData {...{item, onPress: playAudio, onRemove}} />,
    [allFavorites],
  );

  return (
    <AnimatedBackground animation={normal}>
      <PageHeading {...{title: data?.title, navigation, backButton: true}} />
      <View style={{marginTop: -10}}>
        <Heading {...{title: 'Favorite Tracks'}} />
      </View>
      <View style={styles.container}>
        <FlatList
          refreshing={false}
          data={allFavorites}
          onRefresh={onRefresh}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyComponent
              title="Ooopss!"
              fullScreen={true}
              description="Favorites Data"
              onRefresh={onRefresh}
              message="You do not have any items in your favorites."
            />
          }
        />
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(Favorites);
