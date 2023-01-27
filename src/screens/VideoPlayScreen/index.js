import React from 'react';
import {View, SafeAreaView} from 'react-native';
import useVideoPlayScreen from './useVideoPlayScreen';
import ContentHeading from '@/components/ContentHeading';
import PlayerVideo from '@/components/PlayerVideo';
import {styles} from './styles';

const VideoPlayScreen = ({navigation, route}) => {
  const {data} = useVideoPlayScreen({navigation, route});

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ContentHeading {...{title: '', navigation, backButton: true}} />
      <View style={styles.container}>
        <PlayerVideo {...{data, navigation}} />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(VideoPlayScreen);
