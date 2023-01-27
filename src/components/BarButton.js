import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Switch from '@/components/Switch';
import {Colors, FontFamily} from '@/theme/Variables';
import {rightArrow} from '@/Assets/Images';

const BarButton = ({
  title,
  icon,
  onPress,
  version,
  sound,
  active,
  isArrow = true,
}) => {
  const onPressHandler = () => !sound && onPress && onPress();
  return (
    <TouchableOpacity
      onPress={onPressHandler}
      disabled={sound}
      activeOpacity={sound ? 0.5 : 0.9}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.center}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
        {Boolean(!version && !sound && isArrow) && (
          <Image source={rightArrow} />
        )}
        {Boolean(version) && !sound && (
          <Text style={[styles.title, {fontWeight: '400', fontSize: 16}]}>
            {version}
          </Text>
        )}
        {sound && (
          <Switch
            {...{
              status: active,
              isDetails: false,
              setDisabled: onPress,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default BarButton;

const styles = StyleSheet.create({
  container: {
    height: 75,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: Colors.fadeBlue,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  center: {
    width: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    paddingLeft: 10,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  icon: {
    tintColor: Colors.white,
    width: 20,
    height: 20,
  },
});
