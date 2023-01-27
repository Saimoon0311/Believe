import React, {useRef, useState} from 'react';
import {Text, View, ImageBackground, Image, Animated} from 'react-native';
import SafeView from '@/components/SafeView';
import {Touchable} from '@/components/Touchable';
import {Colors, Sizes} from '@/theme/Variables';
import {appIntroData} from '@/utils/helper/LocalDb';
import {back, front} from '@/Assets/Images';
import {styles} from './styles';
import {storeOnBoardToken} from '@/services/storage';

const Dots = ({scrollX}) => {
  const dotPosition = new Animated.divide(scrollX, Sizes.width);

  return (
    <View style={styles.rowMid}>
      {appIntroData.map((item, index) => {
        const dotColor = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [
            Colors.primaryColor3,
            Colors.greenFaded,
            Colors.primaryColor3,
          ],
          extrapolate: 'clamp',
        });
        const dotWidth = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [15, 20, 15],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`dots-${index}`}
            style={{
              height: 5,
              width: dotWidth,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: dotColor,
            }}
          />
        );
      })}
    </View>
  );
};

const AppIntro = ({navigation}) => {
  const scrollX = new Animated.Value(0);
  // const scrollX = useRef(new Animated.Value(0));
  const flatlistRef = useRef();

  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewChangeRef = useRef(({viewableItems, changed}) => {
    setCurrentIndex(viewableItems[0].index);
  });

  // console.log('currentIndex', currentIndex);

  return (
    <Animated.FlatList
      horizontal
      pagingEnabled
      ref={flatlistRef}
      data={appIntroData}
      // scrollEventThrottle={20}
      snapToAlignment="center"
      onScroll={Animated.event(
        [
          {
            nativeEvent: {contentOffset: {x: scrollX}},
          },
        ],
        {useNativeDriver: false},
      )}
      onViewableItemsChanged={onViewChangeRef.current}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(x, i) => i.toString()}
      renderItem={({item, index}) => {
        return (
          <View key={index} style={{width: Sizes.width}}>
            <ImageBackground source={item.image} style={styles.background}>
              <SafeView>
                <View style={styles.container}>
                  <View style={styles.subContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text numberOfLines={3} style={styles.description}>
                      {item.description}
                    </Text>
                    <View style={styles.dotContainer}>
                      <Dots scrollX={scrollX} />
                    </View>
                  </View>
                  {currentIndex == 2 ? (
                    <Touchable
                      Opacity={0.7}
                      style={styles.rightButton}
                      // onPress={() => navigation.replace('Welcome')}
                      onPress={() => {
                        storeOnBoardToken('ONBOARD/TOKEN', 'true');
                        navigation.replace('Onboarding');
                      }}>
                      <Image source={front} />
                    </Touchable>
                  ) : null}
                  {/* {currentIndex < onboardingData.length ? (
                    <Touchable
                      onPress={() => {
                        if (currentIndex != 0)
                          flatlistRef?.current?.scrollToIndex({
                            index: currentIndex - 1,
                            animated: true,
                          });
                      }}
                      Opacity={0.7}
                      style={styles.leftButton}>
                      <Image
                        style={{
                          tintColor:
                            currentIndex == 0
                              ? Colors.transparent
                              : Colors.white,
                        }}
                        source={back}
                      />
                    </Touchable>
                  ) : (
                    <Touchable
                      Opacity={0.7}
                      style={styles.rightButton}
                      onPress={() => navigation.replace('Welcome')}>
                      <Image source={front} />
                    </Touchable>
                  )} */}
                </View>
              </SafeView>
            </ImageBackground>
          </View>
        );
      }}
      style={{backgroundColor: Colors.primaryColor}}
    />
  );
};

export default AppIntro;
