import React, {useCallback} from 'react';
import {View, FlatList, Text} from 'react-native';
import {normal} from '@/Assets/lottie';
import useAffiliateReferral from './useAffiliateReferral';
import PageHeading from '@/components/PageHeading';
import {Touchable} from '@/components/Touchable';
import {referData} from '@/utils/helper/LocalDb';
import AffiliateCard from '@/components/AffiliateCard';
import {styles} from './styles';
import {randomNanoIdGenerator} from '@/utils/helper';
import AnimatedBackground from '@/components/AnimatedBackground';

const AffiliateReferral = ({navigation, route}) => {
  const {data} = useAffiliateReferral({navigation, route});

  const renderItem = useCallback(
    ({item, index}) => <AffiliateCard {...{item, index}} />,
    [referData],
  );

  const title = 'Affiliate Referral';

  return (
    <AnimatedBackground animation={normal}>
      <PageHeading {...{title, navigation, backButton: true}} />
      <View style={styles.container}>
        <Text style={styles.heading}>You Have Earned</Text>
        <Touchable Opacity={0.7} style={styles.earningBox}>
          <Text style={styles.earning}>$90</Text>
        </Touchable>
        <View style={styles.subContainer}>
          <Text style={styles.heading}>People You’ve Referred</Text>
          <View style={styles.cardContainer}>
            <FlatList
              bounces={false}
              data={referData}
              renderItem={renderItem}
              listKey={(x, i) => i.toString()}
              keyExtractor={randomNanoIdGenerator}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              ItemSeparatorComponent={() => <View style={styles.line} />}
            />
          </View>
        </View>
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(AffiliateReferral);
