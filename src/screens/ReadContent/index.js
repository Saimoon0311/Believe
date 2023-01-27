import React from 'react';
import {View, ScrollView} from 'react-native';
import SafeView from '@/components/SafeView';
import ContentHeading from '@/components/ContentHeading';
import {normal} from '@/Assets/lottie';
import useReadContent from './useReadContent';
import {styles} from './styles';
import {Sizes} from '@/theme/Variables';
import RenderHTML from 'react-native-render-html';
import AnimatedBackground from '@/components/AnimatedBackground';

const ReadContent = ({navigation, route}) => {
  const {data, count, increment, decrement, onSlide} = useReadContent({
    navigation,
    route,
  });
  return (
    <AnimatedBackground animation={normal}>
      <ContentHeading {...{title: data?.title, navigation, backButton: true}} />
      <View style={styles.container}>
        {/* <ContentDescription {...{data, audio: true}} /> */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {Boolean(data?.text || data?.description) && (
            <RenderHTML
              contentWidth={Sizes.width}
              source={{html: data?.text || data?.description}}
            />
          )}
        </ScrollView>
      </View>
      {/* <View style={styles.sliderBox}>
          <View style={styles.sliderCard}>
            <Touchable style={styles.counter} Opacity={0.7} onPress={decrement}>
              <Image source={fontSize} style={styles.minIcon} />
            </Touchable>
            <Slider
              value={count}
              minimumValue={1}
              maximumValue={5}
              onValueChange={onSlide}
              thumbStyle={styles.thumb}
              onSlidingComplete={onSlide}
              containerStyle={styles.slider}
              thumbTintColor={Colors.greenCard2}
              minimumTrackTintColor={Colors.greenCard2}
            />
            <Touchable style={styles.counter} Opacity={0.7} onPress={increment}>
              <Image source={fontSize} style={styles.maxIcon} />
            </Touchable>
          </View>
        </View> */}
    </AnimatedBackground>
  );
};

export default React.memo(ReadContent);
