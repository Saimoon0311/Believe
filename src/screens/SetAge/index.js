import React, {useCallback} from 'react';
import {View, ScrollView, RefreshControl, Text} from 'react-native';
import TransparentCard from '@/components/TransparentCard';
import FadeButton from '@/components/FadeButton';
import {normal} from '@/Assets/lottie';
import useSetAge from './useSetAge';
import {styles} from './styles';
import Bottom from './Bottom';
import AnimatedBackground from '@/components/AnimatedBackground';

const SetAge = ({navigation, route}) => {
  const {age, ageData, setAge, GoNext, GoSkip, onRefresh} = useSetAge(
    navigation,
    route,
  );

  const renderAge = useCallback(
    (item, index) => (
      <TransparentCard
        key={index}
        {...{item, index, marked: age, onPress: setAge}}
      />
    ),
    [age],
  );

  return (
    <AnimatedBackground animation={normal}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Bottom />
          {ageData.map(renderAge)}
        </View>
        <View style={styles.bottom}>
          <FadeButton {...{title: 'Continue', onPress: GoNext}} />
        </View>
        <Text
          onPress={() => GoSkip()}
          style={[styles.text, {textDecorationLine: 'underline'}]}>
          Skip
        </Text>
      </ScrollView>
    </AnimatedBackground>
  );
};

export default SetAge;
