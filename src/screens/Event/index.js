import React, {useCallback} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Platform,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import EmptyComponent from '@/components/EmptyComponent';
import VerticalCard from '@/components/VerticalCard';
import PageHeading from '@/components/PageHeading';
import {Colors, FontFamily} from '@/theme/Variables';
import {normal} from '@/Assets/lottie';
import useEvent from './useEvent';
import {styles} from './styles';
import {randomNanoIdGenerator} from '@/utils/helper';
import AnimatedBackground from '@/components/AnimatedBackground';

const isIos = Platform.OS === 'ios';

const Event = ({navigation}) => {
  const {options, data, card, setCard, onRefresh} = useEvent({navigation});

  const renderItem = useCallback(
    ({item, index}) => <VerticalCard {...{item, index, card}} />,
    [data],
  );

  return (
    <AnimatedBackground animation={normal}>
      <SafeAreaView
        style={[
          styles.safearea,
          {
            paddingTop: isIos ? 0 : 30,
          },
        ]}>
        <PageHeading {...{title: 'Live Events'}} />
        <View style={styles.mainContainer}>
          <SwitchSelector
            hasPadding
            height={50}
            initial={0}
            fontSize={18}
            valuePadding={5}
            options={options}
            borderRadius={10}
            textStyle={{
              fontSize: 18,
              fontFamily: FontFamily.medium,
            }}
            selectedTextStyle={{
              fontSize: 18,
              fontFamily: FontFamily.medium,
            }}
            backgroundColor="#062859"
            selectedColor={Colors.white}
            testID="gender-switch-selector"
            buttonColor={Colors.greenFaded}
            textColor={Colors.primaryColor2}
            borderColor={Colors.primaryColor}
            onPress={value => setCard({value: value})}
            accessibilityLabel="gender-switch-selector"
          />
        </View>
        <View style={styles.container}>
          <FlatList
            data={data}
            refreshing={false}
            onRefresh={onRefresh}
            renderItem={renderItem}
            keyExtractor={randomNanoIdGenerator}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            ListEmptyComponent={
              <View style={{marginHorizontal: '5%'}}>
                <EmptyComponent
                  title="Ooopss!"
                  description="Events"
                  onRefresh={onRefresh}
                />
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </AnimatedBackground>
  );
};

export default Event;
