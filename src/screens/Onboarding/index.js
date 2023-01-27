import React, {Fragment, useState, useCallback, useRef} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {Sizes} from '@/theme/Variables';
import {onboardingData} from '@/utils/helper/LocalDb';
import {normal} from '@/Assets/lottie';
import {styles} from './styles';
import FadeButton from '@/components/FadeButton';
import Carousel from 'react-native-reanimated-carousel';
import AnimatedBackground from '@/components/AnimatedBackground';
import AnimatedView, {FadeIn, FadeOut} from 'react-native-reanimated';
import AnimatedTyping from '@/components/AnimatedTyping';
import {storeOnBoardToken} from '@/services/storage';
import * as Animatable from 'react-native-animatable';

const Onboarding = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatedValue, setAnimatedValue] = useState('fadeIn');
  const [animation, setCurrentAnimation] = useState('fadeIn');
  const [timeState, setTimeState] = useState(0);
  const carouselRef = useRef(null);
  const renderCarouselItem = useCallback(
    ({item, index}) => (
      <Fragment>
        {currentIndex == index && (
          // <AnimatedView.View
          //   style={{height: 180}}
          //   entering={FadeIn.duration(1000)}
          //   exiting={FadeOut.duration(1000)}>
          <Animatable.View
            duration={700}
            key={animation}
            animation={animation}
            // easing={'ease-out-back'}
            easing={animation == 'fadeOut' ? 'ease-out-back' : 'ease-in-back'}>
            <View style={{paddingHorizontal: 10, height: 180}}>
              <Text style={styles.title}>{item?.title}</Text>
              <Text style={styles.description}>{item?.description}</Text>
            </View>
            <View style={styles.box}>
              {item.data.map((item, index) => {
                return (
                  <View key={index} style={styles.boxData}>
                    <Image
                      source={item.image}
                      style={styles.boxImage}
                      resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                      <Text numberOfLines={2} style={styles.heading}>
                        {item?.name}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animatable.View>
        )}
      </Fragment>
    ),
    [animation],
  );

  /*  Animation on Dot touch */

  // const renderCarouselItem = (item, index) => (
  //   <Animatable.View duration={600} animation={animatedValue}>
  //     <View style={{paddingHorizontal: 10, height: 180}}>
  //       {currentIndex == index && (
  //         <AnimatedTyping
  //           style={styles.title}
  //           text={[onboardingData[currentIndex]?.title]}
  //         />
  //       )}
  //       <Text style={styles.description}>
  //         {onboardingData[currentIndex]?.description}
  //       </Text>
  //     </View>
  //     <View style={styles.box}>
  //       {item.data.map((item, index) => {
  //         return (
  //           <View key={index} style={styles.boxData}>
  //             <Image
  //               source={item.image}
  //               style={styles.boxImage}
  //               resizeMode="cover"
  //             />
  //             <View style={styles.textContainer}>
  //               <Text numberOfLines={2} style={styles.heading}>
  //                 {item?.name}
  //               </Text>
  //             </View>
  //           </View>
  //         );
  //       })}
  //     </View>
  //   </Animatable.View>
  // );

  return (
    <AnimatedBackground animation={normal}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Carousel
            ref={carouselRef}
            loop={false}
            autoPlay={true}
            width={Sizes.width}
            autoPlayInterval={2500}
            data={onboardingData}
            scrollAnimationDuration={700}
            onSnapToItem={index => setCurrentIndex(index)}
            onScrollBegin={() => {
              setCurrentAnimation('fadeOut');
              // setCurrentAnimation('fadeIn');
              // setTimeout(() => setCurrentAnimation('fadeOut'), 500);
            }}
            onScrollEnd={() => setCurrentAnimation('fadeIn')}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            defaultIndex={currentIndex}
            renderItem={renderCarouselItem}
          />
          {/* {renderCarouselItem(onboardingData[currentIndex], timeState)} */}
        </View>

        <View style={styles.button}>
          <View>
            <View style={styles.dots}>
              {onboardingData.map((item, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      carouselRef?.current?.scrollTo({index, animated: true});
                    }}
                    // onPress={() => {
                    //   setAnimatedValue('fadeOut');
                    //   setTimeout(() => {
                    //     setTimeState(index);
                    //     setCurrentIndex(prev => (prev = index));
                    //   }, 600);
                    //   setTimeout(() => {
                    //     setAnimatedValue('fadeIn');
                    //   }, 800);
                    // }}
                    key={`dots-${index}`}>
                    <View style={styles.dotsItem(currentIndex, index)} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <FadeButton
            title={'Get Started'}
            onPress={() => {
              storeOnBoardToken('ONBOARD/TOKEN', 'true');
              navigation.replace('OnboardStack', {screen: 'SetGoals'});
            }}
          />
        </View>
        <View style={styles.rowMid}>
          <Text style={styles.text}>Already have an account? </Text>
          <Text
            onPress={() => {
              storeOnBoardToken('ONBOARD/TOKEN', 'true');
              navigation.replace('Login');
            }}
            style={[styles.text, {textDecorationLine: 'underline'}]}>
            Login
          </Text>
        </View>
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(Onboarding);

// import React, {Fragment, useState, useCallback} from 'react';
// import {Text, View, Image, TouchableOpacity} from 'react-native';
// import {Sizes} from '@/theme/Variables';
// import {onboardingData} from '@/utils/helper/LocalDb';
// import {normal} from '@/Assets/lottie';
// import {styles} from './styles';
// import FadeButton from '@/components/FadeButton';
// import Carousel from 'react-native-reanimated-carousel';
// import AnimatedBackground from '@/components/AnimatedBackground';
// import AnimatedView, {FadeIn, FadeOut} from 'react-native-reanimated';
// import AnimatedTyping from '@/components/AnimatedTyping';
// import {storeOnBoardToken} from '@/services/storage';
// import * as Animatable from 'react-native-animatable';

// const Onboarding = ({navigation}) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [animatedValue, setAnimatedValue] = useState('fadeIn');
//   const [animation, setCurrentAnimation] = useState('fadeIn');
//   const [timeState, setTimeState] = useState(0);
//   const renderCarouselItem = useCallback(
//     ({item, index}) => (
//       <Fragment>
//         {currentIndex == index && (
//           // <AnimatedView.View
//           //   style={{height: 180}}
//           //   entering={FadeIn.duration(1000)}
//           //   exiting={FadeOut.duration(1000)}>
//           <Animatable.View
//             // duration={250}
//             // delay={}
//             key={animation}
//             animation={animation}
//             easing={animation == 'fadeOut' ? 'ease-out' : 'ease-in'}>
//             <View style={{paddingHorizontal: 10, height: 180}}>
//               <Text style={styles.title}>{item?.title}</Text>
//               <Text style={styles.description}>{item?.description}</Text>
//             </View>
//             <View style={styles.box}>
//               {item.data.map((item, index) => {
//                 return (
//                   <View key={index} style={styles.boxData}>
//                     <Image
//                       source={item.image}
//                       style={styles.boxImage}
//                       resizeMode="cover"
//                     />
//                     <View style={styles.textContainer}>
//                       <Text numberOfLines={2} style={styles.heading}>
//                         {item?.name}
//                       </Text>
//                     </View>
//                   </View>
//                 );
//               })}
//             </View>
//           </Animatable.View>
//         )}
//       </Fragment>
//     ),
//     [currentIndex, animation],
//   );

//   /*  Animation on Dot touch */

//   // const renderCarouselItem = (item, index) => (
//   //   <Animatable.View duration={600} animation={animatedValue}>
//   //     <View style={{paddingHorizontal: 10, height: 180}}>
//   //       {currentIndex == index && (
//   //         <AnimatedTyping
//   //           style={styles.title}
//   //           text={[onboardingData[currentIndex]?.title]}
//   //         />
//   //       )}
//   //       <Text style={styles.description}>
//   //         {onboardingData[currentIndex]?.description}
//   //       </Text>
//   //     </View>
//   //     <View style={styles.box}>
//   //       {item.data.map((item, index) => {
//   //         return (
//   //           <View key={index} style={styles.boxData}>
//   //             <Image
//   //               source={item.image}
//   //               style={styles.boxImage}
//   //               resizeMode="cover"
//   //             />
//   //             <View style={styles.textContainer}>
//   //               <Text numberOfLines={2} style={styles.heading}>
//   //                 {item?.name}
//   //               </Text>
//   //             </View>
//   //           </View>
//   //         );
//   //       })}
//   //     </View>
//   //   </Animatable.View>
//   // );

//   return (
//     <AnimatedBackground animation={normal}>
//       <View style={styles.container}>
//         <View style={{flex: 1}}>
//           <Carousel
//             loop={false}
//             autoPlay={true}
//             width={Sizes.width}
//             autoPlayInterval={2500}
//             data={onboardingData}
//             scrollAnimationDuration={100}
//             onSnapToItem={index => setCurrentIndex(index)}
//             onScrollBegin={() => {
//               setCurrentAnimation('fadeOut');
//               // setCurrentAnimation('fadeIn');
//               // setTimeout(() => setCurrentAnimation('fadeOut'), 500);
//             }}
//             onScrollEnd={() => setCurrentAnimation('fadeIn')}
//             panGestureHandlerProps={{
//               activeOffsetX: [-10, 10],
//             }}
//             defaultIndex={currentIndex}
//             renderItem={renderCarouselItem}
//           />
//           {/* {renderCarouselItem(onboardingData[currentIndex], timeState)} */}
//         </View>

//         <View style={styles.button}>
//           <View>
//             <View style={styles.dots}>
//               {onboardingData.map((item, index) => {
//                 return (
//                   <TouchableOpacity
//                     activeOpacity={0.9}
//                     onPress={() => {
//                       setAnimatedValue('fadeOut');
//                       setTimeout(() => {
//                         setTimeState(index);
//                         setCurrentIndex(prev => (prev = index));
//                       }, 600);
//                       setTimeout(() => {
//                         setAnimatedValue('fadeIn');
//                       }, 800);
//                     }}
//                     key={`dots-${index}`}>
//                     <View style={styles.dotsItem(currentIndex, index)} />
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </View>
//           <FadeButton
//             title={'Get Started'}
//             onPress={() => {
//               storeOnBoardToken('ONBOARD/TOKEN', 'true');
//               navigation.replace('OnboardStack', {screen: 'SetGoals'});
//             }}
//           />
//         </View>
//         <View style={styles.rowMid}>
//           <Text style={styles.text}>Already have an account? </Text>
//           <Text
//             onPress={() => {
//               storeOnBoardToken('ONBOARD/TOKEN', 'true');
//               navigation.replace('Login');
//             }}
//             style={[styles.text, {textDecorationLine: 'underline'}]}>
//             Login
//           </Text>
//         </View>
//       </View>
//     </AnimatedBackground>
//   );
// };

// export default React.memo(Onboarding);
