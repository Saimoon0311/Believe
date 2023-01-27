import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Touchable} from './Touchable';
import {Colors, FontFamily} from '@/theme/Variables';
import {next} from '@/Assets/Images';

const SimpleButton = ({title, icon, onPress}) => {
  return (
    <Touchable onPress={onPress} Opacity={0.7}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Image source={icon} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </Touchable>
  );
};

export default SimpleButton;

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginBottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    paddingLeft: 10,
    textAlign: 'left',
    color: Colors.greenFaded,
    fontFamily: FontFamily.medium,
  },
  icon: {
    tintColor: Colors.greenFaded,
  },
});
