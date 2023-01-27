import React from 'react';
import {View, Image, Text} from 'react-native';
import {meditate} from '@/Assets/Images';
import {normal} from '@/Assets/lottie';
import useReminderDetail from './useReminderDetail';
import PageHeading from '@/components/PageHeading';
import Switch from '@/components/Switch';
import moment from 'moment';
import {styles} from './styles';
import AnimatedBackground from '@/components/AnimatedBackground';

const ReminderDetail = ({navigation, route}) => {
  const {data, toggleNotification, isActive} = useReminderDetail(route);
  return (
    <AnimatedBackground animation={normal}>
      <PageHeading {...{navigation, backButton: true}} />
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Text numberOfLines={3} style={styles.title}>
            {data?.title}
          </Text>
          <Image source={meditate} />
          <Text style={styles.time}>{moment(data?.time).format('h:mm A')}</Text>
          <View style={styles.bottom}>
            <Text style={styles.active}>
              {isActive ? 'Active' : 'Inactive'}
            </Text>
            <Switch
              {...{
                status: isActive,
                isDetails: false,
                setDisabled: toggleNotification,
              }}
            />
          </View>
          <Image source={data?.image} />
        </View>
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(ReminderDetail);
