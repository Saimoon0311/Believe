import React, {useCallback} from 'react';
import {View, ScrollView, RefreshControl, Text} from 'react-native';
import TransparentCard from '@/components/TransparentCard';
import FadeButton from '@/components/FadeButton';
import {normal} from '@/Assets/lottie';
import useSetGender from './useSetGender';
import {styles} from './styles';
import Header from './Header';
import AnimatedBackground from '@/components/AnimatedBackground';

const SetGender = ({navigation, route}) => {
  const {gender, genderData, setGender, GoNext, GoSkip, onRefresh} =
    useSetGender(navigation, route);

  const renderItem = useCallback(
    (item, index) => (
      <TransparentCard
        key={index}
        {...{item, index, marked: gender, onPress: setGender}}
      />
    ),
    [gender],
  );

  return (
    <AnimatedBackground animation={normal}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Header />
          {genderData.map(renderItem)}
        </View>
        <View style={styles.bottom}>
          <FadeButton {...{title: 'Continue', onPress: GoNext}} />
        </View>
        <Text
          onPress={() => GoSkip()}
          style={[styles.text, {textDecorationLine: 'underline'}]}>
          Skip
        </Text>
      </ScrollView>
    </AnimatedBackground>
  );
};

export default SetGender;
