import React, {useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';
import {normal} from '@/Assets/lottie';
import {modalStyles, overlayStyle} from '@/theme/Variables';
import ContentHeading from '@/components/ContentHeading';
import EmptyComponent from '@/components/EmptyComponent';
import {keyExtractor} from '@/utils/helper';
import {Touchable} from '@/components/Touchable';
import ReviewCard from '@/components/ReviewCard';
import AddReview from '@/components/AddReview';
import {Modalize} from 'react-native-modalize';
import useReviews from './useReviews';
import {styles} from './styles';
import AnimatedBackground from '@/components/AnimatedBackground';

const Reviews = ({navigation, route}) => {
  const {
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
  } = useReviews(navigation, route);
  const title = data?.title || data?.name;

  const renderItem = useCallback(
    ({item, index}) => <ReviewCard {...{item, index}} />,
    [allReviews],
  );

  return (
    <AnimatedBackground animation={normal}>
      <ContentHeading {...{title, navigation, backButton: true}} />
      <View style={styles.container}>
        <Touchable onPress={onOpen} Opacity={0.7}>
          <Text style={styles.text}>Add Review</Text>
        </Touchable>
        <FlatList
          data={allReviews}
          refreshing={false}
          onRefresh={onRefresh}
          renderItem={renderItem}
          listKey={keyExtractor}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={
            <View style={styles.padding}>
              <EmptyComponent
                title="Ooopss!"
                padding={true}
                description="Reviews"
                onRefresh={onRefresh}
              />
            </View>
          }
        />
      </View>
      <Modalize
        ref={modalizeRef}
        withHandle={false}
        modalStyle={modalStyles}
        closeOnOverlayTap={true}
        overlayStyle={overlayStyle}
        adjustToContentHeight={true}>
        <AddReview
          {...{
            data,
            rating,
            onClose,
            errors,
            control,
            onSubmit,
            handleSubmit,
            setRating,
          }}
        />
      </Modalize>
    </AnimatedBackground>
  );
};

export default React.memo(Reviews);
