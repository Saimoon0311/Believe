import React, {useCallback} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {normal} from '@/Assets/lottie';
import {Touchable} from '@/components/Touchable';
import {Colors} from '@/theme/Variables';
import Header from './Header';
import useGoals from './useGoals';
import {styles} from './styles';
import AnimatedBackground from '@/components/AnimatedBackground';

/**
 * It renders a list of goals that the user can select
 * @returns A function that returns a component.
 */
const Goals = ({navigation, route}) => {
  /* Destructuring the useGoals hook. */
  const {goBack, goals, onRefresh, selectGoals, selected} = useGoals(
    navigation,
    route,
  );
  /* A callback function that is used to render the goals. */
  const renderGoalItem = useCallback(
    (item, index) => {
      return (
        <Touchable
          key={index}
          Opacity={0.7}
          onPress={() => selectGoals(item)}
          style={[
            styles.button,
            {
              backgroundColor: selected.includes(item.id)
                ? Colors.greenFaded
                : Colors.fadeBlue,
            },
          ]}>
          <Text style={styles.text}>{item?.name}</Text>
        </Touchable>
      );
    },
    [selected, goals],
  );

  return (
    <AnimatedBackground animation={normal}>
      <Header {...{goBack, ...route?.params}} />
      <View style={styles.container}>
        <ScrollView
          bounces={false}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }>
          <View style={styles.wrap}>{goals.map(renderGoalItem)}</View>
        </ScrollView>
      </View>
    </AnimatedBackground>
  );
};

export default Goals;
