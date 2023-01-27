import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  Keyboard,
  Image,
} from 'react-native';
import {normal} from '@/Assets/lottie';
import SafeView from '@/components/SafeView';
import Heading from '@/components/Headings';
import {Touchable} from '@/components/Touchable';
import {Colors} from '@/theme/Variables';
import PageHeading from '@/components/PageHeading';
import useSearch from './useSearch';
import {styles} from './styles';
import {keyExtractor} from '@/utils/helper';
import FavoriteData from '@/components/FavoriteData';
import {Search as SearchIcon} from '../../Assets/Images';
import ScriptCard2 from '@/components/ScriptCard2';
import EmptyComponent from '@/components/EmptyComponent';
import {useEffect} from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';

const Search = ({navigation, route}) => {
  const {
    SuggestedData,
    recentSearchData,
    suggestKeyword,
    _setSearch,
    _setResultData,
    searchingResult,
    searchingResultData,
    value,
    setValue,
    playAudio,
    selectKeyword,
  } = useSearch({
    navigation,
    route,
  });

  // const [value, setValue] = useState('')
  const [visible, setVisible] = useState(false);

  /* A callback function that is used to render the data in the FlatList. */
  const renderItem = useCallback(
    ({item}) => (
      <FavoriteData {...{item, onPress: playAudio, favoriteTrue: false}} />
    ),
    [searchingResult],
  );

  const renderItem2 = useCallback(
    ({item}) => (
      <ScriptCard2 {...{item, title: 'series', onPress: playAudio}} />
    ),
    [searchingResultData],
  );

  useEffect(() => {
    if (searchingResultData.length != 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [searchingResultData]);

  return (
    <AnimatedBackground animation={normal}>
      <SafeView>
        <PageHeading {...{title: 'Search'}} />
        <View style={styles.subContainer}>
          <View style={styles.textfield}>
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
          </View>
        </View>

        {searchingResultData.length != 0 ? (
          <View style={{margin: 20}}>
            <FlatList
              numColumns={2}
              refreshing={false}
              style={{marginBottom: 110}}
              data={searchingResultData}
              renderItem={renderItem2}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              ListEmptyComponent={
                <EmptyComponent
                  title="Ooopss!"
                  fullScreen={true}
                  description="Videos"
                />
              }
            />
          </View>
        ) : searchingResultData.length == 0 && value != '' ? (
          <View style={{marginTop: 100}}>
            {visible && <Text style={styles.text}>No result Found!</Text>}
          </View>
        ) : (
          <>
            <Heading {...{title: 'Recent Search', view: true, disable: true}} />
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{margin: 20}}>
                {recentSearchData.map((item, index) => {
                  return (
                    <ScriptCard2
                      key={index}
                      {...{item: item, title: 'series', onPress: playAudio}}
                    />
                  );
                })}
              </ScrollView>

              <Heading {...{title: 'Popular Searches'}} />
              <View style={styles.wrap}>
                {suggestKeyword?.suggested_keywords?.map((item, index) => {
                  return (
                    <Touchable
                      key={index}
                      Opacity={0.7}
                      onPress={() => {
                        setVisible(false), selectKeyword(item);
                      }}
                      style={[
                        styles.button,
                        {
                          backgroundColor: SuggestedData.includes(item)
                            ? Colors.greenFaded
                            : Colors.fadeBlue,
                        },
                      ]}>
                      <Text style={styles.text}>{item.queries}</Text>
                    </Touchable>
                  );
                })}
              </View>
            </ScrollView>
          </>
        )}
      </SafeView>
    </AnimatedBackground>
  );
};

export default Search;
