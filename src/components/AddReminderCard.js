import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import {Touchable} from './Touchable';
import {plus, reminderCard} from '@/Assets/Images';

const AddReminderCard = ({title, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={reminderCard} style={styles.image} />
        <View style={styles.textCard}>
          <View style={styles.textView}>
            <Text style={styles.heading}>{title}</Text>
          </View>
          <Touchable onPress={onPress} style={styles.button} Opacity={0.7}>
            <Image source={plus} style={styles.icon} />
          </Touchable>
        </View>
      </View>
    </View>
  );
};

export default AddReminderCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: '5%',
  },
  card: {
    borderRadius: 10,
  },
  image: {
    height: 80,
    width: '100%',
    borderRadius: 10,
  },
  textCard: {
    top: 0,
    bottom: 0,
    width: '95%',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    justifyContent: 'space-between',
  },
  textView: {
    marginLeft: '23%',
  },
  heading: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  subHeading: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  button: {
    height: 40,
    width: 40,
    borderRadius: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
});
