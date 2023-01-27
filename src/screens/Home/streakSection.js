import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

/**
 * It returns a view with three touchable opacity components
 * @returns A component that displays the total number of sessions, total number of minutes, and the
 * number of consecutive days.
 */
const StreakSection = ({
  total_taken_session,
  total_spend_mints,
  streaks,
  style,
}) => (
  <View style={[styles.box, {...style}]}>
    <View style={styles.bottomBox}>
      <Text style={styles.bottomHeading}>{total_taken_session}</Text>
      <Text numberOfLines={2} style={styles.bottomPara}>
        Total Sessions
      </Text>
    </View>
    <View style={styles.seperator} />
    <View style={styles.bottomBox}>
      <Text style={styles.bottomHeading}>{total_spend_mints}</Text>
      <Text numberOfLines={2} style={styles.bottomPara}>
        Total Minutes
      </Text>
    </View>
    <View style={styles.seperator} />
    <View style={styles.bottomBox}>
      <Text style={styles.bottomHeading}>{streaks}</Text>
      <Text numberOfLines={2} style={styles.bottomPara}>
        Consecutive Days
      </Text>
    </View>
  </View>
);

export default React.memo(StreakSection);
