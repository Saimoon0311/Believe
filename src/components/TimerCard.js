import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, FontFamily, FontSize} from '@/theme/Variables';
import {contentTime} from '@/utils/helper';

const TimerCard = ({data, item, onPress, warn = false}) => {
  const selectValue = () => onPress?.();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={selectValue}
      style={styles.listView}>
      <Text numberOfLines={1} style={styles.name}>
        {item?.name}
      </Text>
      <View style={styles.row}>
        {!warn ? (
          <Text numberOfLines={1} style={styles.name}>
            {item?.time
              ? data
                ? contentTime(data)
                : item?.title
              : data?.title || item?.title}
          </Text>
        ) : (
          <Text numberOfLines={1} style={styles.name}>
            none
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(TimerCard);

const styles = StyleSheet.create({
  listView: {
    marginBottom: 5,
    borderRadius: 10,
    paddingVertical: 25,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: Colors.fadeBlue,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  name: {
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.regular,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
