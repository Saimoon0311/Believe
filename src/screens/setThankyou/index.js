import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {normal} from '@/Assets/lottie';
import {styles} from './styles';
import FadeButton from '@/components/FadeButton';
import useSetThankyou from './useThankyou';
import AnimatedBackground from '@/components/AnimatedBackground';
import BlurImage from '@/components/BlurImage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SetThankyou = ({navigation, route}) => {
  const {GoNext, apidata, feelingData, goalingData, onPlay, user} =
    useSetThankyou(navigation, route);
  const name = user?.name;
  return (
    <AnimatedBackground animation={normal}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.mainContainer}>
          <Text
            style={[
              styles.heading,
              {marginVertical: 30, marginTop: 50, textAlign: 'center'},
            ]}>
            Thank you, {name}!{' '}
          </Text>

          <View style={{marginVertical: 20}}>
            <Text style={styles.title}>
              <Text style={{textDecorationLine: 'underline'}}>To Achieve</Text>{' '}
              : {goalingData.join(', ')}
            </Text>
            <Text style={{...styles.title, marginTop: hp('1')}}>
              <Text style={{textDecorationLine: 'underline'}}>To Feel</Text> :{' '}
              {feelingData.join(', ')}
            </Text>
          </View>

          <Text
            style={{
              ...styles.subTitle,
              marginTop: hp('5'),
              marginBottom: hp('5'),
            }}>
            Your Personal Recommendation
          </Text>

          <Text style={styles.subTitle}>{apidata?.audio?.title}</Text>

          <BlurImage
            uri={apidata.audio?.cover_image}
            styles={{
              height: 200,
              borderRadius: 20,
              marginVertical: 20,
            }}
            blurhash={apidata?.audio?.cover_hash_code}>
            <TouchableOpacity
              style={styles.blurTouch}
              onPress={onPlay}
              activeOpacity={0.6}>
              <Ionicons
                name="play-circle"
                color={'white'}
                size={hp('8')}
                style={{opacity: 0.5}}
              />
            </TouchableOpacity>
          </BlurImage>

          <Text style={styles.subTitle}>
            For best results listen daily for 30 days
          </Text>

          <View style={styles.bottom}>
            <FadeButton {...{title: 'Explore Believe Now', onPress: GoNext}} />
          </View>
        </View>
      </ScrollView>
    </AnimatedBackground>
  );
};

export default SetThankyou;
