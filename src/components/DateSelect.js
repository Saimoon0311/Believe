import React from 'react';
import {StyleSheet, Text, Image} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Colors, FontFamily} from '@/theme/Variables';
import {calendar} from '@/Assets/Images';
import {Touchable} from './Touchable';

const DateSelect = ({
  selectedDate,
  isDatePickerVisible,
  showDatePicker,
  hideDatePicker,
  handleConfirm,
}) => {
  const maxDate = new Date();
  return (
    <Touchable Opacity={0.7} style={styles.button} onPress={showDatePicker}>
      <Image style={styles.icon} source={calendar} />
      <Text style={styles.time}>{selectedDate}</Text>
      <DateTimePickerModal
        mode="date"
        maximumDate={maxDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        isVisible={isDatePickerVisible}
      />
    </Touchable>
  );
};

export default DateSelect;

const styles = StyleSheet.create({
  button: {
    height: 75,
    width: '100%',
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    backgroundColor: Colors.fadeBlue,
  },
  time: {
    fontSize: 18,
    paddingLeft: 15,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  icon: {
    width: 20,
    height: 20,
    // marginLeft: 10,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
});
