import React from 'react';
import {View, Text, Image} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {normal} from '@/Assets/lottie';
import {downArrow} from '@/Assets/Images';
import {Touchable} from '@/components/Touchable';
import BackButton from '@/components/BackButton';
import FadeButton from '@/components/FadeButton';
import useSetReccommend from './useSetReccommend';
import MenuList from '@/components/MenuList';
import {styles} from './styles';
import Header from './Header';
import AnimatedBackground from '@/components/AnimatedBackground';

const SetReccommend = ({navigation, route}) => {
  const {
    visible,
    selectedTime,
    momentView,
    selectMoment,
    isDatePickerVisible,
    hideMenu,
    showMenu,
    onSelect,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    GoNext,
  } = useSetReccommend({navigation, route});

  return (
    <AnimatedBackground animation={normal}>
      <BackButton {...{navigation, home: true}} />
      <View style={styles.container}>
        <Header />
        <View style={styles.subContainer}>
          <MenuList
            {...{
              visible,
              hideMenu,
              showMenu,
              onSelect,
              momentView,
              data: selectMoment,
            }}
          />
          <Touchable
            Opacity={0.7}
            style={styles.button}
            onPress={showDatePicker}>
            <Text style={styles.time}>{selectedTime}</Text>
            <DateTimePickerModal
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              isVisible={isDatePickerVisible}
            />
            <Image style={styles.icon} source={downArrow} />
          </Touchable>
        </View>
        <Text style={styles.text}>Set a different time for weekends</Text>
      </View>
      <View style={styles.bottom}>
        <FadeButton {...{title: 'Continue', onPress: GoNext}} />
      </View>
    </AnimatedBackground>
  );
};

export default SetReccommend;
