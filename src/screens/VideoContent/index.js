import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {normal} from '@/Assets/lottie';
import useVideoContent from './useVideoContent';
import ContentHeading from '@/components/ContentHeading';
import ContentDescription from '@/components/ContentDescription';
import VideoPlayer from '@/components/VideoPlayer';
import {styles} from './styles';
import AnimatedBackground from '@/components/AnimatedBackground';
import Video from 'react-native-video';

const VideoContent = ({navigation, route}) => {
  const {data, fullscreen, checkFullScreen} = useVideoContent({
    navigation,
    route,
  });

  return fullscreen ? (
    <VideoPlayer {...{data, navigation, checkFullScreen, fullscreen}} />
  ) : (
    <AnimatedBackground animation={normal}>
      <ContentHeading {...{title: data?.title, navigation, backButton: true}} />
      <ScrollView
        bounces={false}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}>
        <VideoPlayer {...{data, navigation, checkFullScreen, fullscreen}} />
        <View style={styles.container}>
          <ContentDescription {...{data}} />
          <View style={styles.descriptionLine}>
            <Text style={styles.description}>Description:</Text>
          </View>
          <View>
            <Text style={styles.content}>{data?.description}</Text>
          </View>
        </View>
      </ScrollView>
    </AnimatedBackground>
  );
};

export default React.memo(VideoContent);
