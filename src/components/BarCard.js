import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import {Touchable} from './Touchable';
import {arrowRight, timer} from '@/Assets/Images';
// import {durationAsString} from '@/utils/helper';
import ReminderCard from './ReminderCard';

const BarCard = ({data, reminderDetail, viewReminders}) => {
  const AddReminderCard = ({item}) => {
    // const remainingTime = durationAsString(new Date(), item?.date);
    // const message = `${remainingTime || `${1}min`}`;

    return (
      <View style={styles.card}>
        <Image source={timer} style={styles.boxData} />
        <View style={styles.textCard}>
          <View style={styles.textView}>
            <Text numberOfLines={1} style={styles.heading}>
              {item?.title}
            </Text>
            {/* <Text numberOfLines={2} style={styles.subHeading}>
              {remainingTime?.includes('-')
                ? 'Reminder Expired'
                : `I’m reminding you in ${message}`}
            </Text> */}
          </View>
          <Touchable onPress={() => viewReminders(true)} Opacity={0.7}>
            <Image source={arrowRight} style={styles.icon} />
          </Touchable>
        </View>
      </View>
    );
  };

  const renderItem = useCallback(
    (item, ind) => {
      return item?.title !== 'Set a Reminder' ? (
        <ReminderCard isHome key={ind} {...{item, reminderDetail, ind}} />
      ) : (
        <AddReminderCard key={ind} {...{item}} />
      );
    },
    [data],
  );
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      horizontal>
      {data?.map(renderItem)}
    </ScrollView>
  );
};

export default BarCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingRight: 10,
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    height: 85,
  },
  boxData: {
    height: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
    width: Sizes.width * 0.8,
  },
  textCard: {
    top: 0,
    bottom: 0,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  textView: {
    width: '85%',
  },
  heading: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  subHeading: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  icon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
});
