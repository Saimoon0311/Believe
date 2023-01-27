import {background} from '@/Assets/Images';
import React, {useState} from 'react';
import {View, ImageBackground} from 'react-native';
import {Blurhash} from 'react-native-blurhash';

const BlurBackground = ({styles, uri, blurhash, children}) => {
  const [load, setLoad] = useState(true);
  const hideLoad = () => setLoad(false);
  const dummyImage =
    'https://vrc-bucket.s3.us-east-2.amazonaws.com/hypnosis/cover-images/rigYKSc7Rd9RRfqiiyJqVo5FAxiedT0iaalNUzXR.jpg';
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 0.1,
      }}>
      {uri ? (
        <ImageBackground
          onLoad={hideLoad}
          onError={hideLoad}
          source={{uri: uri || dummyImage}}
          style={[styles, {position: 'absolute'}]}
        />
      ) : (
        <ImageBackground
          source={background}
          style={[styles, {position: 'absolute'}]}
        />
      )}

      {load && Boolean(uri) && (
        <Blurhash
          resizeMode="cover"
          shouldRasterizeIOS
          style={{flex: 1, position: 'relative', zIndex: 1}}
          blurhash={blurhash || 'LTG*j6E0~VnLxV?ZMw%05P-pNZWB'}
        />
      )}

      <View
        style={[
          styles,
          {
            flex: 1,
            zIndex: 999,
            position: 'absolute',
            // backgroundColor: 'rgba(29,134,202,.3)',
            backgroundColor: 'rgba(0,0,0,.3)',
          },
        ]}>
        {children}
      </View>
    </View>
  );
};

export default React.memo(BlurBackground);
