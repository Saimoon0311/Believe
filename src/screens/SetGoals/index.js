import React, {useCallback} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import SafeView from '@/components/SafeView';
import {normal} from '@/Assets/lottie';
import {Touchable} from '@/components/Touchable';
import {Colors} from '@/theme/Variables';
import useSetGoals from './useSetGoals';
import {styles} from './styles';
import Header from './Header';
import FadeButton from '@/components/FadeButton';
import AnimatedBackground from '@/components/AnimatedBackground';

const SetGoals = ({navigation, route}) => {
  const {goals, goalData, GoNext, selectGoals, onRefresh} = useSetGoals(
    navigation,
    route,
  );

  const renderItem = useCallback(
    (item, index) => (
      <Touchable
        key={index}
        Opacity={0.7}
        onPress={() => selectGoals(item)}
        style={[
          styles.button,
          {
            backgroundColor: goals.includes(item?.id)
              ? Colors.greenFaded
              : Colors.fadeBlue,
          },
        ]}>
        <Text style={styles.text}>{item?.name}</Text>
      </Touchable>
    ),
    [goals],
  );

  return (
    <AnimatedBackground animation={normal}>
      <SafeView>
        <Header GoNext={GoNext} />
        <View style={styles.container}>
          <ScrollView
            bounces={false}
            style={styles.mainContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }>
            <View style={styles.wrap}>{goalData.map(renderItem)}</View>
          </ScrollView>
        </View>
        <View style={styles.bottom}>
          <FadeButton {...{title: 'Continue', onPress: GoNext}} />
        </View>
      </SafeView>
    </AnimatedBackground>
  );
};

export default SetGoals;
