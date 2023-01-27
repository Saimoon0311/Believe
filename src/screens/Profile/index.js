import React from 'react';
import {View, Text} from 'react-native';
import SafeArea from '@/components/SafeArea';
import {styles} from './styles';
import ActionButton from '@/components/ActionButton';

const Profile = ({navigation}) => {
  const screenAudio = () => navigation.navigate('Audio');
  return (
    <SafeArea>
      <View style={styles.container}>
        <Text style={styles.text}>Profile</Text>
        <ActionButton
          {...{
            onPress: screenAudio,
            buttonTitle: 'Audio',
            blackBox: true,
          }}
        />
      </View>
    </SafeArea>
  );
};

export default Profile;
