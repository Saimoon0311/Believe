import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';

const ContentCard = ({item, updateCourseCategory, selected}) => (
  <TouchableOpacity
    onPress={() => updateCourseCategory(item)}
    activeOpacity={0.7}
    style={styles.card(Boolean(item?.id == selected?.id))}>
    <Text numberOfLines={1} style={styles.heading}>
      {item?.title}
    </Text>
  </TouchableOpacity>
);

export default React.memo(ContentCard);

const styles = StyleSheet.create({
  card: selected => ({
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: selected ? Colors.greenCard2 : Colors.blueButton,
    height: 40,
  }),
  heading: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
});
