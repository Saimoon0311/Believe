import React from 'react';
import {StyleSheet, View} from 'react-native';
import Card from '@/components/Card';

const CardContainer = ({boxData, viewGoals, recentAchievements}) => {
  return (
    <View style={styles.container}>
      <Card {...{data: boxData[0], onPress: recentAchievements}} />
      <Card {...{data: boxData[1], onPress: viewGoals}} />
    </View>
  );
};

export default CardContainer;

const styles = StyleSheet.create({
  container: {
    marginBottom: '-9%',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
  },
});
