import React, {useCallback} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {normal} from '@/Assets/lottie';
import {Touchable} from '@/components/Touchable';
import {Colors} from '@/theme/Variables';
import useSetFeeling from './useSetFeeling';
import Header from './Header';
import {styles} from './styles';
import FadeButton from '@/components/FadeButton';
import AnimatedBackground from '@/components/AnimatedBackground';

const SetFeeling = ({navigation, route}) => {
  const {feeling, feelingData, onRefresh, goNext, selectFeelings} =
    useSetFeeling(navigation, route);

  const renderItem = useCallback(
    (item, index) => (
      <Touchable
        key={index}
        Opacity={0.7}
        onPress={() => selectFeelings(item)}
        style={[
          styles.button,
          {
            backgroundColor: feeling.includes(item?.id)
              ? Colors.greenFaded
              : Colors.fadeBlue,
          },
        ]}>
        <Text style={styles.text}>{item?.name}</Text>
      </Touchable>
    ),
    [feeling],
  );

  return (
    <AnimatedBackground animation={normal}>
      <Header goNext={goNext} />
      <View style={styles.container}>
        <ScrollView
          bounces={false}
          style={styles.mainContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }>
          <View style={styles.wrap}>{feelingData.map(renderItem)}</View>
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <FadeButton {...{title: 'Continue', onPress: goNext}} />
      </View>
    </AnimatedBackground>
  );
};

export default SetFeeling;
