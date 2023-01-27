import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {normal} from '@/Assets/lottie';
import PageHeading from '@/components/PageHeading';
import NextButton from '@/components/NextButton';
import TimerCard from '@/components/TimerCard';
import useSettings from './useSettings';
import {styles} from './styles';
import AnimatedBackground from '@/components/AnimatedBackground';

const Settings = ({navigation, route}) => {
  const {
    timer,
    tracksData,
    meditateData,
    backgroundData,
    onSessionStart,
    onBackgroundSelect,
    daynamicRoute,
  } = useSettings(navigation, route);
  const {meditation, title, endBell, startBell, background} = meditateData;
  const backImage = background?.title
    ? {...background, name: 'Background'}
    : backgroundData;
  return (
    <AnimatedBackground animation={normal}>
      <PageHeading {...{title, navigation, backButton: true}} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.heading}>Set Timer</Text>
              <TimerCard
                item={timer[0]}
                data={meditation}
                onPress={() =>
                  daynamicRoute('SessionSelect', 'meditation', 'Meditation')
                }
              />
            </View>
            <View>
              <Text style={styles.heading}>Set Sound</Text>
              <TimerCard
                item={tracksData[0]}
                data={startBell}
                onPress={() =>
                  daynamicRoute('SoundSelect', 'startBell', 'Starting Bell')
                }
              />
              <TimerCard
                item={tracksData[1]}
                data={endBell}
                onPress={() =>
                  daynamicRoute('SoundSelect', 'endBell', 'Ending Bell')
                }
              />
            </View>
            <View>
              <Text style={styles.heading}>Set Background</Text>
              <TimerCard
                item={backImage}
                data={backImage}
                onPress={onBackgroundSelect}
              />
            </View>
            <View style={styles.bottomSeperator} />
            <NextButton buttonTitle={'Start'} onPress={onSessionStart} />
          </ScrollView>
        </View>
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(Settings);
