import {normal} from '@/Assets/lottie';
import AnimatedBackground from '@/components/AnimatedBackground';
import PageHeading from '@/components/PageHeading';
import React, {useCallback} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import {Colors} from '@/theme/Variables';
import {styles} from './styles';
import SeriesCard from '@/components/SeriesCard';
import EmptyComponent from '@/components/EmptyComponent';
import useAddPlayListData from './useAddPlayListData';
import {keyExtractor} from '@/utils/helper';

const AddPlayListData = ({navigation, route}) => {
  const {
    onRefresh,
    audio,
    onAddPlaylist,
    onRemovePlaylist,
    onSearch,
    search,
    AudioList,
    onChange,
  } = useAddPlayListData(navigation, route);
  const renderItem = useCallback(
    ({item, index}) => (
      <SeriesCard
        {...{
          item,
          data: item,
          onPress: () => {},
          addIcon: true,
          onAddPlaylist,
          onRemovePlaylist,
          AudioList,
          index,
        }}
      />
    ),
    [],
  );

  return (
    <AnimatedBackground animation={normal}>
      <PageHeading
        {...{title: 'Add Tracks', navigation, backButton: true, addIcon: true}}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor={Colors.white}
        onChangeText={onChange}
        value={search}
        onSubmitEditing={onSearch}
        enterKeyHint="search"
      />
      <View style={styles.container}>
        <FlatList
          refreshing={false}
          data={audio}
          onRefresh={onRefresh}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          extraData={AudioList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={
            <EmptyComponent
              title="Ooopss!"
              fullScreen={true}
              description="Audios"
              onRefresh={onRefresh}
              message={'You have not search any tracks yet'}
            />
          }
        />
      </View>
      {/* <View style={styles.textfield}>
            <Image source={SearchIcon} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder={'Search'}
              placeholderTextColor={Colors.white}
              onChangeText={text => {
                if (text == '') {
                  _setResultData(), setVisible(false);
                }
                setVisible(false);
                setValue(text);
              }}
              value={value}
              autoCapitalize={'none'}
              keyboardType={'default'}
              returnKeyType={'search'}
              onSubmitEditing={() => {
                value && _setSearch(value),
                  // setValue(''),
                  Keyboard.dismiss();
              }}
            />
            {
              // value != '' &&
              value != '' &&
              searchingResultData.length == 0 &&
              visible == false ? (
                <Touchable
                  style={{alignItems: 'center'}}
                  onPress={() => {
                    _setSearch(value),
                      // setValue(''),
                      Keyboard.dismiss();
                  }}>
                  <Text style={{color: Colors.white}}>Search</Text>
                </Touchable>
              ) : value != '' ? (
                <Touchable
                  style={{alignItems: 'center'}}
                  onPress={() => {
                    _setResultData(), setValue(''), setVisible(false);
                    Keyboard.dismiss();
                  }}>
                  <Text style={{color: Colors.white}}>Clear</Text>
                </Touchable>
              ) : null
            }
          </View> */}
    </AnimatedBackground>
  );
};

export default React.memo(AddPlayListData);
