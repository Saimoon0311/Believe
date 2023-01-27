import useReduxStore from '@/hooks/useReduxStore';
import {Colors, FontFamily, Sizes} from '@/theme/Variables';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import ShareButton from './ShareButton';

/**
 * It returns a view with an image, a title, a description and a button
 * @returns A functional component
 */
const EmptyComponent = props => {
  /* Destructuring the props object. */
  const {
    title,
    description,
    onRefresh,
    padding,
    fullScreen,
    message = '',
  } = props;
  /* A custom hook that returns the state of the redux store. */
  const {getState} = useReduxStore();
  /* Destructuring the loading property from the Auth reducer. */
  const {loading} = getState('Auth');
  /* A ternary operator. */
  const condationalStyle = {
    marginTop: padding ? -40 : 0,
    marginBottom: fullScreen ? 40 : 0,
    height: fullScreen ? 350 : 280,
    width: 350,
  };
  return (
    // <>

    // </>

    <View
      style={{
        flex: 1,
        height: Sizes.height / 1.7,
        justifyContent: 'space-around',
      }}>
      {!loading && (
        <>
          <Text
            numberOfLines={2}
            style={[styles.description, {paddingBottom: fullScreen ? 80 : 0}]}>
            {!message ? `${description} not available right now` : message}
          </Text>
          <ShareButton title="Refresh" onPress={onRefresh} hide={true} />
        </>
      )}
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  empty: {
    width: 350,
    height: 280,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 50,
    textAlign: 'center',
    color: Colors.greenFaded,
    fontFamily: FontFamily.medium,
  },
  description: {
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    paddingVertical: 20,
    color: Colors.white,
    marginHorizontal: '10%',
    fontFamily: FontFamily.regular,
  },
});
