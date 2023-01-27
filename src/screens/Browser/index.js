import React from 'react';
import {Sizes} from '@/theme/Variables';
import RenderHTML from 'react-native-render-html';

const Browser = ({route}) => {
  console.log(route, 'Browser');
  const {uri, html} = route?.params;
  const source = uri ? {uri} : {html};
  return uri || html ? (
    <RenderHTML contentWidth={Sizes.width} source={source} />
  ) : null;
};

export default Browser;
