// import React, {useEffect, useState} from 'react';
// import {View, Text, TextInput, Image, StyleSheet, Keyboard} from 'react-native';
// import {Controller} from 'react-hook-form';
// import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
// import {eye, eye_off} from '../Assets/Images';
// import {Touchable} from './Touchable';

// const InputField = ({
//   minLength,
//   placeholder,
//   isRequired,
//   isSecure,
//   control,
//   name,
//   message,
//   errors,
//   type,
//   defaultValue = '',
//   isDisabled = false,
// }) => {
//   const [show, setShow] = useState(!isSecure);
//   const handleClick = () => setShow(!show);
//   const keyboardType = ['phone', 'reset_code'].includes(name)
//     ? 'numeric'
//     : 'default';
//   const [focus, setFocus] = useState(false);
//   function onFocus() {
//     setFocus(true);
//   }
//   function onBlur() {
//     setFocus(false);
//   }

//   useEffect(() => {
//     const keyboardHide = Keyboard.addListener('keyboardDidHide', () => {
//       setFocus(false);
//       Keyboard.dismiss();
//     });
//     return () => {
//       keyboardHide.remove();
//     };
//   }, []);

//   return (
//     <>
//       <Controller
//         render={({field: {onChange, value}}) => (
//           <View style={styles.textfield}>
//             <TextInput
//               onBlur={onBlur}
//               onFocus={onFocus}
//               type={type}
//               {...{
//                 value,
//                 isDisabled,
//                 selectionColor: Colors.primaryColor,
//                 placeholder,
//                 keyboardType,
//                 style: styles.input,
//                 secureTextEntry: !show,
//                 onChangeText: onChange,
//                 placeholderTextColor: Colors.white,
//                 fontSize: FontSize.large,
//                 autoCapitalize: 'none',
//                 autoCorrect: false,
//                 spellCheck: false,
//               }}
//             />
//             {isSecure && (
//               <Touchable style={styles.eyeContainer} onPress={handleClick}>
//                 <Image
//                   source={!show ? eye_off : eye}
//                   style={{
//                     resizeMode: 'contain',
//                     tintColor: Colors.white,
//                   }}
//                 />
//               </Touchable>
//             )}
//           </View>
//         )}
//         {...{
//           name,
//           control,
//           defaultValue,
//           rules: {required: Boolean(isRequired), minLength},
//         }}
//       />
//       {errors[name]?.message && (
//         <View
//           style={{
//             // width: Platform.OS == 'ios' ? width * 0.875 : Sizes.width * 0.9,
//             width: Sizes.width * 0.9,
//           }}>
//           <Text
//             style={[
//               styles.error,
//               {
//                 fontSize: FontSize.default,
//               },
//             ]}>
//             {errors[name]?.message}
//           </Text>
//         </View>
//       )}
//     </>
//   );
// };

// export default InputField;

// const styles = StyleSheet.create({
//   label: {
//     marginBottom: 5,
//     fontWeight: '400',
//     color: Colors.description,
//     fontSize: FontSize.medium,
//     fontFamily: FontFamily.regular,
//   },
//   textfield: {
//     width: '90%',
//     borderWidth: 1,
//     borderRadius: 10,
//     marginVertical: 10,
//     alignItems: 'center',
//     flexDirection: 'row',
//     borderColor: Colors.white,
//     justifyContent: 'space-between',
//     backgroundColor: Colors.blurWhite,
//   },
//   input: {
//     height: 50,
//     width: '100%',
//     borderRadius: 10,
//     textAlign: 'left',
//     color: Colors.white,
//     paddingHorizontal: 10,
//     fontFamily: FontFamily.medium,
//   },
//   eyeContainer: {
//     width: 30,
//     height: 30,
//     top: '20%',
//     right: '2%',
//     marginRight: 10,
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   description: {
//     marginVertical: 5,
//     color: Colors.placeholder,
//     fontFamily: FontFamily.regular,
//   },
//   error: {
//     color: Colors.redFade,
//     fontFamily: FontFamily.regular,
//   },
// });

import React, {useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {eye, eye_off} from '../Assets/Images';
import {Touchable} from './Touchable';

const InputField = ({
  minLength,
  placeholder,
  isRequired,
  isSecure,
  control,
  name,
  errors,
  type,
  autoCapitalize = 'none',
  defaultValue = '',
  isDisabled = false,
  maxLength,
}) => {
  const [show, setShow] = useState(!isSecure);
  const handleClick = () => setShow(!show);
  const keyboardType = ['phone', 'reset_code'].includes(name)
    ? 'numeric'
    : 'default';
  return (
    <>
      <Controller
        render={({field: {onChange, value}}) => (
          <View style={styles.textfield}>
            <TextInput
              type={type}
              maxLength={maxLength}
              {...{
                value,
                isDisabled,
                selectionColor: Colors.white,
                placeholder,
                keyboardType,
                style: styles.input,
                secureTextEntry: !show,
                onChangeText: onChange,
                placeholderTextColor: Colors.white,
                fontSize: FontSize.large,
                autoCapitalize,
                autoCorrect: false,
                spellCheck: false,
              }}
            />
            {isSecure && (
              <Touchable style={styles.eyeContainer} onPress={handleClick}>
                <Image
                  source={show ? eye : eye_off}
                  style={{
                    resizeMode: 'contain',
                    tintColor: Colors.white,
                  }}
                />
              </Touchable>
            )}
          </View>
        )}
        {...{
          name,
          control,
          defaultValue,
          rules: {required: Boolean(isRequired), minLength},
        }}
      />
      {errors[name]?.message && (
        <View
          style={{
            // width: Platform.OS == 'ios' ? width * 0.875 : Sizes.width * 0.9,
            width: Sizes.width * 0.9,
          }}>
          <Text
            style={[
              styles.error,
              {
                fontSize: FontSize.default,
              },
            ]}>
            {errors[name]?.message}
          </Text>
        </View>
      )}
    </>
  );
};

export default InputField;

const styles = StyleSheet.create({
  textfield: {
    width: '100%',
    // borderWidth: 1,
    height: 64,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    // borderColor: Colors.white,
    justifyContent: 'space-between',
    backgroundColor: Colors.fadeBlue,
    // backgroundColor: Colors.blurWhite,
  },
  input: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    textAlign: 'left',
    color: Colors.white,
    paddingHorizontal: 40,
    fontFamily: FontFamily.regular,
    fontWeight: '300',
  },
  eyeContainer: {
    width: 30,
    height: 30,
    top: '30%',
    right: '1%',
    marginRight: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: Colors.redFade,
    fontFamily: FontFamily.regular,
  },
});
