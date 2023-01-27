import React, {useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {normal} from '@/Assets/lottie';
import PageHeading from '@/components/PageHeading';
import useSearch from './useSearch';
import {styles} from './styles';
import {keyExtractor} from '@/utils/helper';
import EmptyComponent from '@/components/EmptyComponent';
import ScriptCard2 from '@/components/ScriptCard2';
import AnimatedBackground from '@/components/AnimatedBackground';

const SearchingData = ({navigation, route}) => {
  const {searchingResultData, playAudio} = useSearch({
    navigation,
    route,
  });

  const renderItem = useCallback(
    ({item}) => (
      <ScriptCard2 {...{item, title: 'series', onPress: playAudio}} />
    ),
    [searchingResultData],
  );

  return (
    <AnimatedBackground animation={normal}>
      <PageHeading
        {...{title: 'Search Results', navigation, backButton: true}}
      />
      <View
        style={[
          styles.container,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <FlatList
          numColumns={2}
          refreshing={false}
          data={searchingResultData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={
            <EmptyComponent
              title="Ooopss!"
              fullScreen={true}
              description="Videos"
            />
          }
        />
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(SearchingData);

// import React, {useCallback} from 'react';
// import {View, FlatList, ImageBackground} from 'react-native';
// import {background, fadedBackground} from '@/Assets/Images';
// import EmptyComponent from '@/components/EmptyComponent';
// import PageHeading from '@/components/PageHeading';
// import ScriptCard from '@/components/ScriptCard';
// import SafeView from '@/components/SafeView';
// import useSeries from './useSeries';
// import {styles} from './styles';
// import {randomNanoIdGenerator} from '@/utils/helper';

// const Series = ({navigation, route}) => {
//   const {data, allSeries, seriesDetail, onRefresh} = useSeries({
//     navigation,
//     route,
//   });

//   const renderItem = useCallback(
//     ({item}) => (
//       <ScriptCard {...{item, data, title: 'series', onPress: seriesDetail}} />
//     ),
//     [allSeries],
//   );

//   return (
//     <ImageBackground source={background} style={styles.backgroundImage}>
//       <SafeView>
//         <PageHeading {...{title: 'Series', navigation, backButton: true}} />
//         <View style={styles.container}>
//           <FlatList
//             numColumns={2}
//             refreshing={false}
//             data={allSeries}
//             onRefresh={onRefresh}
//             renderItem={renderItem}
//             keyExtractor={randomNanoIdGenerator}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{flexGrow: 1}}
//             ListEmptyComponent={
//               <EmptyComponent
//                 title="Ooopss!"
//                 fullScreen={true}
//                 description="Videos"
//                 onRefresh={onRefresh}
//               />
//             }
//           />
//         </View>
//       </SafeView>
//     </ImageBackground>
//   );
// };

// export default React.memo(Series);
