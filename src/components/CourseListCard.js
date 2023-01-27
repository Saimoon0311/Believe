import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {courseTimeView} from '@/utils/helper';
import {courses} from '@/Assets/Images';
import BlurImage from './BlurImage';

const CourseListCard = ({item, courseDetail}) => {
  // 523.765714 duration data
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.boxData}
      onPress={() => courseDetail(item)}>
      <BlurImage
        uri={item?.image}
        styles={styles.boxData}
        blurhash={item?.hash_code}
      />
      <View style={styles.textContainer}>
        <View style={styles.width}>
          <Text numberOfLines={2} style={styles.heading}>
            {item?.title}
          </Text>
          <View style={styles.rowCenter}>
            <Image source={courses} style={styles.icon} />
            <Text numberOfLines={1} style={styles.type}>
              Courses
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.subHeading}>
            {courseTimeView(item?.duration)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CourseListCard);

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  boxData: {
    height: 250,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  textContainer: {
    bottom: 0,
    zIndex: 1,
    width: '100%',
    height: '40%',
    position: 'absolute',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'space-around',
    backgroundColor: Colors.overlayColor,
  },
  width: {
    // width: '80%',
  },
  heading: {
    fontSize: 18,
    width: '90%',
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  subHeading: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'left',
    color: Colors.grayScale,
    fontFamily: FontFamily.regular,
  },
  rowCenter: {
    marginTop: 3,
    alignItems: 'center',
    flexDirection: 'row',
    // paddingVertical: 2.5,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  type: {
    fontSize: 12,
    paddingLeft: 5,
    textAlign: 'left',
    color: Colors.white,
    textTransform: 'capitalize',
    fontFamily: FontFamily.medium,
  },
});
