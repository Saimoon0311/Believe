import React from 'react';
import {View, Text, Image} from 'react-native';
import SafeView from '@/components/SafeView';
import {clock} from '@/Assets/Images';
import BlurImage from '@/components/BlurImage';
import FadeButton from '@/components/FadeButton';
import useFinalize from './useFinalize';
import {styles} from './styles';
import Header from './Header';
import moment from 'moment';
import {normal} from '@/Assets/lottie';
import AnimatedBackground from '@/components/AnimatedBackground';

const Finalize = ({navigation, route}) => {
  const {data, GoNext} = useFinalize({
    navigation,
    route,
  });

  return (
    <AnimatedBackground animation={normal}>
      <View style={styles.container}>
        <Header username={data?.data?.name} />
        <View>
          <View style={styles.card}>
            <BlurImage
              styles={styles.image}
              uri={data?.audio?.image}
              blurhash={data?.audio?.hash_code}
            />
            <Text numberOfLines={2} style={styles.sound}>
              {data?.audio?.name}
            </Text>
          </View>
          <View style={styles.button}>
            <Image style={styles.icon} source={clock} />
            <Text style={styles.time}>{data?.data?.moment}</Text>
            <Text style={styles.time}>
              {moment(data?.data?.recommendation_time).format('hh:mm A')}
            </Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.view}>
            <Text style={styles.title}>
              {data?.percentage} of members notice a different in {data?.days}{' '}
              days
            </Text>
            <Text style={styles.text}>
              We are excited for you and can't wait to be a part of your
              transformation
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <FadeButton {...{title: 'Continue', onPress: GoNext}} />
      </View>
    </AnimatedBackground>
  );
};

export default Finalize;
