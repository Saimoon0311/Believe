import React, {useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';
import {normal} from '@/Assets/lottie';
import SafeView from '@/components/SafeView';
import SelectionHeader from '@/components/SelectionHeader';
import useBackgroundSelect from './useBackgroundSelect';
import BackgroundCard from '@/components/BackgroundCard';
import EmptyComponent from '@/components/EmptyComponent';
import {styles} from './styles';
import {keyExtractor} from '@/utils/helper';
import Switch from '@/components/Switch';
import AnimatedBackground from '@/components/AnimatedBackground';

const BackgroundSelect = ({navigation, route}) => {
  const {
    backgrounds,
    marked,
    setMarked,
    backFunction,
    onRefresh,
    active,
    toggle,
  } = useBackgroundSelect(navigation, route);

  const renderItem = useCallback(
    ({item}) => <BackgroundCard {...{item, marked, onPress: setMarked}} />,
    [marked, active],
  );

  return (
    <AnimatedBackground animation={normal}>
      <SafeView>
        <SelectionHeader {...{navigation, backButton: true, backFunction}} />
        <View style={styles.container}>
          <Text style={styles.title}>Video Background</Text>
          <View style={styles.switch}>
            <Switch
              {...{
                status: active,
                isDetails: false,
                setDisabled: toggle,
              }}
            />
          </View>
        </View>
        <View style={styles.subContainer}>
          <FlatList
            numColumns={2}
            refreshing={false}
            data={backgrounds}
            onRefresh={onRefresh}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            ListEmptyComponent={
              <EmptyComponent
                title="Ooopss!"
                description="Backgrounds"
                onRefresh={onRefresh}
              />
            }
          />
        </View>
      </SafeView>
    </AnimatedBackground>
  );
};

export default React.memo(BackgroundSelect);
