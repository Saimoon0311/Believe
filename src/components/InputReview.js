import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {AirbnbRating} from 'react-native-ratings';
import {Controller} from 'react-hook-form';

const InputReview = ({
  minLength,
  placeholder,
  isRequired,
  control,
  name,
  errors,
  type,
  defaultValue,
  isDisabled = false,
  rating,
  setRating,
}) => {
  const keyboardType = ['phone', 'reset_code'].includes(name)
    ? 'numeric'
    : 'default';

  return (
    <>
      <Controller
        render={({field: {onChange, value}}) => (
          <View>
            <View>
              {/* <StarRating
                maxStars={5}
                starSize={30}
                rating={rating}
                style={styles.star}
                onChange={setRating}
                enableSwiping={true}
                enableHalfStar={true}
                color={Colors.rating}
                starStyle={styles.starStyle}
              /> */}
              <AirbnbRating
                selectedColor={Colors.rating}
                showRating={false}
                size={25}
                defaultRating={rating}
                onFinishRating={setRating}
                ratingContainerStyle={styles.starStyle}
              />
            </View>
            <View>
              <View style={styles.textfield}>
                <TextInput
                  type={type}
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                  {...{
                    value,
                    defaultValue,
                    isDisabled,
                    placeholder,
                    keyboardType,
                    style: styles.input,
                    onChangeText: onChange,
                    autoCapitalize: 'none',
                    fontSize: FontSize.large,
                    selectionColor: Colors.white,
                    placeholderTextColor: Colors.blurWhite2,
                  }}
                />
              </View>
            </View>
          </View>
        )}
        {...{
          name,
          control,
          defaultValue,
          rules: {required: Boolean(isRequired), minLength},
        }}
      />
      {errors[name]?.message && (
        <View style={{width: Sizes.width * 0.9}}>
          <Text style={[styles.error, {fontSize: FontSize.default}]}>
            {errors[name]?.message}
          </Text>
        </View>
      )}
    </>
  );
};

export default InputReview;

const styles = StyleSheet.create({
  label: {
    color: Colors.label,
    fontSize: FontSize.default,
    fontFamily: FontFamily.regular,
  },
  textfield: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: Colors.borderBlue,
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryFaded,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    textAlign: 'left',
    color: Colors.white,
    paddingHorizontal: 10,
    fontFamily: FontFamily.regular,
    minHeight: Sizes.height * 0.2,
    maxHeight: Sizes.height * 0.2,
  },
  description: {
    marginVertical: 5,
    color: Colors.placeholder,
    fontFamily: FontFamily.regular,
  },
  error: {
    color: Colors.redFade,
    fontFamily: FontFamily.regular,
  },
  starStyle: {
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  star: {
    width: '100%',
    marginTop: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
