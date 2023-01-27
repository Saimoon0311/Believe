import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Sizes} from '@/theme/Variables';
import useReduxStore from '@/hooks/useReduxStore';
import {handleAppStreak} from '@/store/actions/content-action';
const streaksRoutes = ['meditation', 'hypnosis', 'affirmation'];
import MatrialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SubscribeCheck = ({item, children, style, onPress}) => {
  const {dispatch} = useReduxStore();
  const {navigate} = useNavigation();
  const isUnLocked = Boolean(item?.url || item?.is_available);
  const onPressHandler = () => {
    if (isUnLocked) {
      onPress(item);
      if (streaksRoutes.includes(item?.type)) dispatch(handleAppStreak());
    } else navigate('Subscription', {...item, title: 'Subscription'});
  };
  return (
    <TouchableOpacity
      style={[style, styles.mainContainer]}
      activeOpacity={0.5}
      onPress={onPressHandler}>
      {!isUnLocked && (
        <View style={[style, styles.lockedOverlay]}>
          <View style={styles.lockCircle}>
            <MatrialIcons
              name="lock"
              color="rgba(255,255,255,0.8)"
              size={13.5}
            />
          </View>
        </View>
      )}

      <View style={[style, styles.childrenView]}>{children}</View>
    </TouchableOpacity>
  );
};

export default SubscribeCheck;

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: '4%',
    marginRight: Sizes.width * 0.0325,
    position: 'relative',
  },
  lockedOverlay: {
    zIndex: 10,
    position: 'absolute',
  },
  lockImage: {
    width: 11.5,
    height: 13,
    zIndex: 11,
  },
  childrenView: {
    zIndex: 1,
    position: 'relative',
  },
  lockCircle: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 30,
  },
});
