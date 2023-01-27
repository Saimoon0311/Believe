import React from 'react';
import {View, Text} from 'react-native';
import ActionButton from '@/components/ActionButton';
import {normal} from '@/Assets/lottie';
import UseUpdate from './UseUpdate';
import styles from './styles';
import AnimatedBackground from '@/components/AnimatedBackground';

const Update = ({navigation}) => {
  const {loginRoute} = UseUpdate({
    navigation,
  });

  return (
    <AnimatedBackground animation={normal}>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Password Updated</Text>
          <Text style={styles.desc}>Your password has been updated</Text>
        </View>
        <ActionButton
          {...{
            onPress: loginRoute,
            buttonTitle: 'Login',
          }}
        />
      </View>
    </AnimatedBackground>
  );
};

export default Update;
