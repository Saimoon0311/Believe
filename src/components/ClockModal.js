import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import {analog, cross} from '@/Assets/Images';
// import ReminderSwitch from './ReminderSwitch';
import InputTitle from './InputTitle';
import ButtonPress from './ButtonPress';
import moment from 'moment';

const SIZE = Sizes.width * 0.9;

const days = [
  {
    id: 1,
    day: 'M',
    value: 0,
    name: 'Monday',
  },
  {
    id: 2,
    day: 'T',
    value: 1,
    name: 'Tuesday',
  },
  {
    id: 3,
    day: 'W',
    value: 2,
    name: 'Wednesday',
  },
  {
    id: 4,
    day: 'T',
    value: 3,
    name: 'Thursday',
  },
  {
    id: 5,
    day: 'F',
    value: 4,
    name: 'Friday',
  },
  {
    id: 6,
    day: 'S',
    value: 5,
    name: 'Saturday',
  },
  {
    id: 7,
    day: 'S',
    value: 6,
    name: 'Sunday',
  },
];

const ClockModal = props => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  const {
    onClose,
    showDatePicker,
    hideDatePicker,
    isDatePickerVisible,
    setDisabled,
    disabled,
    setTitle,
    setTime,
    onSave,
    title,
    time,
  } = props;

  const handleConfirm = date => {
    hideDatePicker();
    const selectedDate = new Date(date);
    const currentDate = new Date();
    if (selectedDate.getTime() <= currentDate.getTime())
      selectedDate.setDate(selectedDate.getDate() + 1);
    setTime(selectedDate);
    setHours(moment(selectedDate).format('hh'));
    setMinutes(moment(selectedDate).format('mm'));
  };

  const transformHours = {transform: [{rotate: `${hours * 30}deg`}]};
  const transformMinutes = {transform: [{rotate: `${minutes * 6}deg`}]};

  useEffect(() => {
    if (time) {
      setHours(moment(time).format('hh'));
      setMinutes(moment(time).format('mm'));
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.crossButton}>
        <TouchableOpacity Opacity={0.7} onPress={onClose} style={styles.space}>
          <Image source={cross} />
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Send me a reminder at</Text>
      <InputTitle
        {...{
          value: title,
          placeholder: 'Set Title',
          onChangeText: val => setTitle(val),
          type: 'text',
        }}
      />

      <View style={styles.clock}>
        <Image source={analog} style={styles.analog} />
        <View style={styles.smallCircle} />
        <View style={[styles.mover, transformHours]}>
          <View style={[styles.hoursDial]} />
        </View>
        <View style={[styles.mover, transformMinutes]}>
          <View style={[styles.minutesDial]} />
        </View>
        <View style={[styles.mover]}>
          <View style={[styles.secondsDial]} />
        </View>
      </View>

      <View style={styles.center}>
        <TouchableOpacity
          Opacity={0.7}
          onPress={showDatePicker}
          style={styles.timeCard}>
          <Text
            style={[
              styles.time,
              {
                color: !time ? Colors.blurWhite : Colors.white,
              },
            ]}>
            Set Time
            {/* {!time ? 'Set Time' : moment(time).format('hh:mm A')} */}
          </Text>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            mode="time"
            date={time ? new Date(time) : new Date()}
          />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.subContainer}>
        {days.map((item, index) => {
          return (
            <View
              key={index}
              // Opacity={0.7}
              // onPress={() => selectDay(item)}
              style={[
                styles.button,
                // {
                //   backgroundColor: disabled
                //     ? Colors.greenFaded
                //     : Colors.darkBlue2,
                // },
              ]}>
              <Text
                style={[
                  styles.time,
                  // {
                  //   color: disabled ? Colors.black2 : Colors.white,
                  // },
                ]}>
                {item?.day}
              </Text>
            </View>
          );
        })}
      </View> */}
      {Boolean(time) && (
        <Text style={styles.dateStyle}>{moment(time).format('hh:mm A')}</Text>
      )}
      {/* <View style={styles.center}>
        <View style={styles.bottomBox}>
          <Text style={styles.active}>Selected date</Text>
          <ReminderSwitch
            {...{disabled, setDisabled, color: Colors.greenFaded}}
          />
          <Text style={[styles.active, {marginLeft: 15}]}>Everyday</Text>
        </View>
      </View> */}

      <ButtonPress {...{onPress: onSave, buttonTitle: 'Save'}} />
    </View>
  );
};

export default React.memo(ClockModal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  crossButton: {
    // marginTop: 10,
    marginRight: -10,
    // marginBottom: 10,
    alignItems: 'flex-end',
  },
  space: {
    width: 50,
    height: 50,
    padding: 5,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    width: 45,
    height: 45,
    borderRadius: 180,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.greenFaded,
    // backgroundColor: Colors.darkBlue2,
  },
  heading: {
    fontSize: 26,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.bold,
  },
  center: {
    width: '100%',
    alignItems: 'center',
  },
  timeCard: {
    height: 40,
    width: '30%',
    borderRadius: 10,
    // borderWidth: 1,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.white,
    backgroundColor: Colors.blueMenu2,
  },
  time: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.darkBlue2,
    // color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  bottomBox: {
    paddingVertical: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  active: {
    fontSize: 20,
    paddingRight: 15,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  clock: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mover: {
    width: SIZE,
    height: SIZE,
    position: 'absolute',
    alignItems: 'center',
    borderRadius: SIZE / 2,
    justifyContent: 'flex-start',
  },
  hoursDial: {
    width: 4,
    borderRadius: 4,
    marginTop: '35%',
    position: 'absolute',
    marginBottom: '-15%',
    backgroundColor: Colors.white,
  },
  minutesDial: {
    width: 3,
    zIndex: 1,
    borderRadius: 3,
    marginTop: '30%',
    marginBottom: '-5%',
    position: 'absolute',
    backgroundColor: Colors.white,
  },
  secondsDial: {
    width: 2,
    zIndex: 999,
    borderRadius: 2,
    marginTop: '27.5%',
    position: 'absolute',
    backgroundColor: Colors.seconds,
  },
  smallCircle: {
    width: 10,
    height: 10,
    zIndex: 999,
    borderRadius: 5,
    position: 'absolute',
    backgroundColor: Colors.seconds,
  },
  analog: {
    width: SIZE * 0.6,
    height: SIZE * 0.6,
    resizeMode: 'contain',
  },
  dateStyle: {
    alignSelf: 'center',
    color: Colors.whiteFaded,
    fontSize: 16,
    marginBottom: 10,
  },
});
