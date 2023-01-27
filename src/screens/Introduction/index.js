import React from 'react';
import {View, Text} from 'react-native';
import {normal} from '@/Assets/lottie';
import SafeView from '@/components/SafeView';
import FadeButton from '@/components/FadeButton';
import useIntroduction from './useIntroduction';
import InputName from '@/components/InputName';
import {styles} from './styles';
import AnimatedBackground from '@/components/AnimatedBackground';

const Introduction = ({navigation, route}) => {
  const {errors, control, onSubmit, handleSubmit} = useIntroduction({
    navigation,
    route,
  });

  return (
    <AnimatedBackground animation={normal}>
      <View style={styles.container}>
        <Text style={styles.heading}>Hi! I'm Victoria Gallagher</Text>
        <View style={{marginTop: 15}}>
          <Text style={styles.title}>What is your name?</Text>
          <InputName
            {...{
              name: 'username',
              errors,
              control,
              defaultValue: '',
            }}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <FadeButton {...{title: 'Continue', onPress: handleSubmit(onSubmit)}} />
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(Introduction);
