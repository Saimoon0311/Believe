import React, {useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {normal} from '@/Assets/lottie';
import EmptyComponent from '@/components/EmptyComponent';
import PageHeading from '@/components/PageHeading';
import ScriptCard from '@/components/ScriptCard';
import useScripts from './useScripts';
import {styles} from './styles';
import {keyExtractor} from '@/utils/helper';
import AnimatedBackground from '@/components/AnimatedBackground';

const Scripts = ({navigation, route}) => {
  const {data, allScripts, scriptDetail, onRefresh} = useScripts(
    navigation,
    route,
  );

  const renderItem = useCallback(
    ({item}) => (
      <ScriptCard {...{item, data, title: 'script', onPress: scriptDetail}} />
    ),
    [allScripts],
  );

  return (
    <AnimatedBackground animation={normal}>
      <PageHeading {...{title: 'Scripts', navigation, backButton: true}} />
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          refreshing={false}
          data={allScripts}
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

export default React.memo(Scripts);
