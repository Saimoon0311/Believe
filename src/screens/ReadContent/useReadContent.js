import {useState} from 'react';

const useReadContent = ({navigation, route}) => {
  const data = route.params;
  const [count, setCount] = useState(1);

  const increment = () => {
    // setCount(slide + 1);
    if (count < 5) setCount(prev => prev + 1);
  };

  const decrement = () => {
    // setCount(slide - 1);
    if (count > 1) setCount(prev => prev - 1);
  };

  const onSlide = slide => {
    setCount(Math.floor(slide));
    // setCount(slide);
  };

  // console.log('ReadContent', data);

  return {data, count, increment, decrement, onSlide};
};

export default useReadContent;
