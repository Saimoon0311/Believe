import React from 'react';
import {View} from 'react-native';
import {normal} from '@/Assets/lottie';
import {styles} from './styles';
import Lottie from 'lottie-react-native';
import AnimatedBackground from '@/components/AnimatedBackground';
import AnimatedTyping from '@/components/AnimatedTyping';
import {useEffect} from 'react';
import {OnboardFinalizeService} from '@/services/onboard-service';

const ContentLoading = ({navigation, route}) => {
  const {params} = route;
  // useEffect(() => {
  //   setTimeout(() => {
  //     // sendData();
  //     navigation.navigate('Welcome', {...params});
  //   }, 5000);
  // }, []);

  const sendData = async () => {
    try {
      const {ok, data} = await OnboardFinalizeService({
        user_name: params?.username || '',
        // tracks_length: params?.track?.name,
        gender: params?.gender?.name,
        age: params?.age?.name,
        usergoal_ids: params?.goals,
        userfeeling_ids: params?.feeling,
      });
      if (ok) navigation.navigate('Thankyou', {...params, audio: data?.audio});
    } catch (error) {
      console.log('sendData', error);
    }
  };

  return (
    <AnimatedBackground animation={normal}>
      <View style={styles.subcontainer}>
        <AnimatedTyping
          text={[`Creating Your Personal Recommendations .   .   .`]}
          style={[styles.heading, {height: 300}]}
          onComplete={() => navigation.navigate('Welcome', {...params})}
          speed={50}
        />

        <View style={{height: 300, width: 300, position: 'absolute'}}>
          <Lottie
            source={require('../../Assets/lottie/loading.json')}
            autoPlay
            loop
          />
        </View>
      </View>
    </AnimatedBackground>
  );
};

export default ContentLoading;
