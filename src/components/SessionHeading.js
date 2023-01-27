import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {back, settings} from '@/Assets/Images';
import {Touchable} from './Touchable';

const SessionHeading = ({title, navigation, closeAudio}) => {
  const backPress = () => {
    closeAudio();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Touchable onPress={backPress} Opacity={0.7}>
        <Image
          source={back}
          style={[
            styles.back,
            {
              marginLeft: '5%',
              tintColor: Colors.white,
            },
          ]}
        />
      </Touchable>
      <Text numberOfLines={1} style={styles.heading}>
        {title}
      </Text>
      {/* <Touchable Opacity={0.7}>
        <Image source={settings} />
      </Touchable> */}
    </View>
  );
};

export default SessionHeading;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  heading: {
    width: '80%',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.white,
    paddingVertical: 20,
    fontFamily: FontFamily.medium,
  },
  back: {
    width: 20,
    height: 20,
    marginVertical: '5%',
  },
});
