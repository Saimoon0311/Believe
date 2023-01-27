import React, {useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {normal} from '@/Assets/lottie';
import EmptyComponent from '@/components/EmptyComponent';
import {keyExtractor} from '@/utils/helper';
import useScriptDetails from './useScriptDetails';
import ScriptCard from '@/components/ScriptCard';
import MenuReview from '@/components/MenuReview';
import {styles} from './styles';
import AnimatedBackground from '@/components/AnimatedBackground';

const ScriptDetails = ({navigation, route}) => {
  /* Destructuring the useScriptDetails hook. */
  const {
    data,
    scriptChapters,
    visible,
    hideMenu,
    showMenu,
    contentDetail,
    onRefresh,
    viewReviews,
  } = useScriptDetails(navigation, route);
  /* A callback function that is used to render the items in the flatlist. */
  const renderItem = useCallback(
    ({item}) => (
      <ScriptCard {...{item, data, title: 'script', onPress: contentDetail}} />
    ),
    [scriptChapters],
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
          numColumns={2}
          refreshing={false}
          data={scriptChapters}
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

export default React.memo(ScriptDetails);
