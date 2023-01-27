import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import InputReview from './InputReview';
import {Touchable} from './Touchable';
import {cross} from '@/Assets/Images';

const AddReview = ({
  data,
  onClose,
  errors,
  control,
  onSubmit,
  handleSubmit,
  rating,
  setRating,
}) => {
  return (
    <View style={styles.container}>
      <Touchable Opacity={0.7} onPress={onClose} style={styles.space}>
        <Image source={cross} />
      </Touchable>
      <Text style={styles.heading}>Description</Text>
      <View style={styles.subContainer}>
        <Text style={styles.text}>{data?.description}</Text>
        <InputReview
          {...{
            name: 'review',
            placeholder: 'Write a review',
            errors,
            control,
            isRequired: true,
            defaultValue: '',
            rating,
            setRating,
          }}
        />
        <Touchable
          Opacity={0.7}
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.textButton}>Submit</Text>
        </Touchable>
      </View>
    </View>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  space: {
    paddingTop: '5%',
    paddingBottom: '2.5%',
    alignItems: 'flex-end',
    marginRight: '2%',
  },
  subContainer: {
    marginTop: 10,
  },
  heading: {
    fontSize: 32,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.bold,
  },
  button: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkBlue3,
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    color: Colors.blurWhite2,
    fontFamily: FontFamily.regular,
  },
  textButton: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
});
