import React, {useCallback} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import {normal} from '@/Assets/lottie';
import useSetTrack from './useSetTrack';
import FadeButton from '@/components/FadeButton';
import TransparentCard from '@/components/TransparentCard';
import BackButton from '@/components/BackButton';
import {styles} from './styles';
import Header from './Header';
import AnimatedBackground from '@/components/AnimatedBackground';

const SetTrack = ({navigation, route}) => {
  const {track, trackData, onRefresh, setTrack, goNext} = useSetTrack({
    navigation,
    route,
  });

  const renderItem = useCallback(
    (item, index) => (
      <TransparentCard
        key={index}
        {...{item, index, marked: track, onPress: setTrack}}
      />
    ),
    [track],
  );

  return (
    <AnimatedBackground animation={normal}>
      <BackButton {...{navigation, home: true}} />
      <View style={styles.container}>
        <Header />
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }>
          <View style={styles.wrap}>{trackData.map(renderItem)}</View>
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <FadeButton {...{title: 'Continue', onPress: goNext}} />
      </View>
    </AnimatedBackground>
  );
};

export default SetTrack;
