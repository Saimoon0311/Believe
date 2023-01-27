import React, {useCallback} from 'react';
import {View, FlatList, TouchableOpacity, Image} from 'react-native';
import {normal} from '@/Assets/lottie';
import useDownloads from './useDownloads';
import PageHeading from '@/components/PageHeading';
import DownloadCard from '@/components/DownloadCard';
// import {downloadData} from '@/utils/helper/LocalDb';
import {styles} from './styles';
import EmptyComponent from '@/components/EmptyComponent';
import {randomNanoIdGenerator} from '@/utils/helper';
import AnimatedBackground from '@/components/AnimatedBackground';
import {SwipeListView} from 'react-native-swipe-list-view';
import {deleteIcon} from '@/Assets/Images';
import {Text} from 'react-native';
import {Colors} from '@/theme/Variables';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const Downloads = ({navigation, route}) => {
  const {
    data,
    onPress,
    deleteFilesFunc,
    playAudio,
    onRowOpen,
    deleteAllDownloads,
  } = useDownloads({
    navigation,
    route,
  });

  const renderItem = useCallback(
    ({item}) => <DownloadCard {...{item, display: true, onPress, playAudio}} />,
    [data],
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteFilesFunc(rowMap, data?.index)}>
        <Image source={deleteIcon} style={{tintColor: Colors.redFade}} />
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <AnimatedBackground animation={normal}>
      <PageHeading
        {...{
          title: 'Downloads',
          navigation,
          backButton: true,
          menu: data.length > 0 ? true : false,
          iconPress: deleteAllDownloads,
          iconChange: 's',
          nextText: 'Clear All ',
          menuStyles: {
            flexDirection: 'row',
            marginLeft: widthPercentageToDP('-7'),
          },
          iconStyle: {opacity: 0},
        }}
      />
      <View style={styles.container}>
        <SwipeListView
          useFlatList={true}
          data={data}
          disableRightSwipe={true}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-70}
          previewRowKey={'0'}
          previewOpenValue={0}
          previewOpenDelay={3000}
          onRowOpen={onRowOpen}
          keyExtractor={randomNanoIdGenerator}
          refreshing={false}
          ListEmptyComponent={
            <EmptyComponent
              title="Ooopss!"
              fullScreen={true}
              description="Downloads"
              message="You have not download any tracks."
              // onRefresh={onRefresh}
            />
          }
          // ListEmptyComponent={
          //   <EmptyComponent
          //     title="Ooopss!"
          //     description="Reminders"
          //     onRefresh={onRefresh}
          //   />
          // }
          showsVerticalScrollIndicator={false}
        />
        {/* <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={randomNanoIdGenerator}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyComponent
              title="Ooopss!"
              fullScreen={true}
              description="Downloads"
              message="You have not download any tracks."
              // onRefresh={onRefresh}
            />
          }
        /> */}
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(Downloads);
