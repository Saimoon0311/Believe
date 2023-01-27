import React from 'react';
import {View} from 'react-native';
import KeyBoardWrapper from '@/components/KeyboardWrapper';
import PageHeading from '@/components/PageHeading';
import UpdateField from '@/components/UpdateField';
import {email, Me} from '@/Assets/Images';
import useEditProfile from './useEditProfile';
import {normal} from '@/Assets/lottie';
import SafeView from '@/components/SafeView';
import {styles} from './styles';
import Header from './Header';
import DateSelect from '@/components/DateSelect';
import GenderSelect from '@/components/GenderSelect';
import SaveButton from '@/components/SaveButton';
import AnimatedBackground from '@/components/AnimatedBackground';

const EditProfile = ({navigation, route}) => {
  const {
    data,
    user,
    errors,
    control,
    selectedDate,
    isDatePickerVisible,
    marked,
    setMarked,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    launchImageLibrarys,
    handleSubmit,
    onSubmit,
    image,
  } = useEditProfile({
    navigation,
    route,
  });
  return (
    <AnimatedBackground animation={normal}>
      <SafeView>
        <PageHeading {...{title: data?.title, navigation, backButton: true}} />
        <KeyBoardWrapper>
          <View style={styles.container}>
            <Header {...{user, onPress: launchImageLibrarys, image}} />
            <View>
              <UpdateField
                {...{
                  errors,
                  control,
                  name: 'name',
                  icon: Me,
                  isRequired: true,
                  placeholder: 'Edit name',
                  defaultValue: user?.name,
                  editable: true,
                  maxLength: 20,
                }}
              />
              <UpdateField
                {...{
                  errors,
                  control,
                  name: 'email',
                  icon: email,
                  isRequired: true,
                  placeholder: 'Edit Email',
                  defaultValue: user?.email,
                  // defaultValue: `${user?.email}mail`,
                  editable: false,
                }}
              />
              <DateSelect
                {...{
                  selectedDate,
                  isDatePickerVisible,
                  showDatePicker,
                  hideDatePicker,
                  handleConfirm,
                }}
              />
              <GenderSelect {...{marked, setMarked}} />
            </View>
            <SaveButton title="Save" onPress={handleSubmit(onSubmit)} />
          </View>
        </KeyBoardWrapper>
      </SafeView>
    </AnimatedBackground>
  );
};

export default EditProfile;
