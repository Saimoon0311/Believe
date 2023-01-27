import {useEffect, useRef, useState} from 'react';
import useReduxStore from '@/hooks/useReduxStore';
import {getAllReviews, postReview} from '@/store/actions/content-action';
import Schemas from '@/utils/Validation';
import useFormHook from '@/hooks/useForm';

const useReviews = (navigation, {params}) => {
  const data = params;
  const {getState, dispatch} = useReduxStore();
  const {allReviews} = getState('Content');
  const [rating, setRating] = useState(0);
  const {handleSubmit, reset, errors, control} = useFormHook(
    Schemas.reviewSend,
  );

  // console.log('data', data);

  const modalizeRef = useRef(null);
  const onOpen = () => modalizeRef.current?.open();
  const onClose = () => modalizeRef.current?.close();

  const onSubmit = message => {
    if (rating != 0) {
      dispatch(
        postReview({
          params: {
            ...message,
            rating,
            [data?.value]: data?.id,
          },
          sendParam: data?.sendRequest,
        }),
      );
      reset('', {
        keepValues: false,
      });
      onRefresh();
      onClose();
    }
  };

  // console.log('useReviews', data);
  // console.log('allReviews', allReviews);

  const onRefresh = _ => dispatch(getAllReviews(data?.requestParam));

  useEffect(() => {
    onRefresh();
  }, []);

  return {
    data,
    rating,
    allReviews,
    modalizeRef,
    errors,
    control,
    handleSubmit,
    onSubmit,
    onOpen,
    onClose,
    setRating,
    onRefresh,
  };
};

export default useReviews;
