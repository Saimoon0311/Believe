import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {AMPMLayout, durationAsString, timeLayout} from '@/utils/helper';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import {morning, night} from '@/Assets/Images';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const ReminderCard = ({item, reminderDetail, isHome, ind}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      style={styles.container(isHome, ind)}
      onPress={() => reminderDetail(item)}>
      <View style={styles.row}>
        <View style={styles.imageBox}>
          <Image
            source={!AMPMLayout(item?.time) ? morning : night}
            style={styles.icon}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.heading} numberOfLines={2}>
            {item?.title}
          </Text>
          <View style={styles.bottomTextContainer}>
            <Text style={styles.title}>
              {item?.status == 1 ? 'Active' : 'Inactive'}
            </Text>
            <Text style={styles.subHeading}>{timeLayout(item?.time)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReminderCard;

const styles = StyleSheet.create({
  container: (isHome, ind) => ({
    height: 85,
    marginBottom: isHome ? 0 : 15,
    borderRadius: 11.75,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    backgroundColor: Colors.darkBlue3,
    // borderColor: Colors.borderBlue,
    // borderWidth: 2,
    width: isHome ? Sizes.width * 0.85 : Sizes.width * 0.9,
    marginRight: isHome ? 10 : 0,
    marginLeft: ind == 0 && isHome ? 10 : 0,
  }),
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageBox: {
    width: 35,
    alignItems: 'center',
  },
  textBox: {
    width: '87%',
    // paddingLeft: 25,
    marginLeft: widthPercentageToDP('5'),
  },
  heading: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
    width: '95%',
  },
  bottomTextContainer: {
    marginTop: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    textAlign: 'left',
    color: Colors.whiteFaded,
    fontFamily: FontFamily.regular,
    width: '70%',
  },
  subHeading: {
    fontSize: 15,
    textAlign: 'right',
    color: Colors.white,
    fontFamily: FontFamily.bold,
    marginRight: 20,
  },
  icon: {
    tintColor: Colors.white,
  },
});
