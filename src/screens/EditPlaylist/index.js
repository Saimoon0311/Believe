import React from 'react';
import {View} from 'react-native';
import SafeView from '@/components/SafeView';
import {normal} from '@/Assets/lottie';
import useEditPlaylist from './useEditPlaylist';
import PageHeading from '@/components/PageHeading';
import EditCard from '@/components/EditCard';
import InputPlaylist from '@/components/InputPlaylist';
import DualButton from '@/components/DualButton';
import {styles} from './styles';
import KeyBoardWrapper from '@/components/KeyboardWrapper';
import AnimatedBackground from '@/components/AnimatedBackground';

const EditPlaylist = ({navigation, route}) => {
  const {
    data,
    playlist,
    errors,
    control,
    goBack,
    image,
    onSubmit,
    handleSubmit,
    launchImageLibrarys,
  } = useEditPlaylist({
    navigation,
    route,
  });

  return (
    <AnimatedBackground animation={normal}>
      <SafeView>
        <KeyBoardWrapper>
          <PageHeading
            {...{title: 'Edit Playlist', navigation, backButton: true}}
          />
          <View style={styles.center}>
            <EditCard
              {...{item: playlist, onPress: launchImageLibrarys, image}}
            />
          </View>
          <View style={styles.container}>
            <InputPlaylist
              {...{
                errors,
                control,
                name: 'name',
                isRequired: true,
                label: 'Edit Name',
                defaultValue: data?.name,
                placeholder: 'Edit name',
              }}
            />
          </View>
          <DualButton
            {...{onPress: goBack, title2: 'Save', onSubmit, handleSubmit}}
          />
        </KeyBoardWrapper>
      </SafeView>
    </AnimatedBackground>
  );
};

export default React.memo(EditPlaylist);
