import React, {useCallback} from 'react';
import {View, FlatList, Text} from 'react-native';
import {normal} from '@/Assets/lottie';
import Lottie from 'lottie-react-native';
import SafeView from '@/components/SafeView';
import PageHeading from '@/components/PageHeading';
import useBadges from './useBadges';
import {styles} from './styles';
import Badge from '@/components/Badge';
// import EmptyComponent from '@/components/EmptyComponent';
import {keyExtractor} from '@/utils/helper';
import * as LottieBadges from '@/Assets/lottie';
import AnimatedBackground from '@/components/AnimatedBackground';

const Badges = ({navigation, route}) => {
  const {state, getBadges} = useBadges(navigation, route);
  const {all_badges, last_unlocked} = state;
  const renderItem = useCallback(
    ({item, index}) => <Badge {...{item, index}} />,
    [all_badges],
  );

  return (
    <AnimatedBackground animation={normal}>
      <PageHeading {...{title: '', navigation, backButton: true}} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Lottie
            source={LottieBadges[last_unlocked?.name]}
            autoPlay
            style={{height: 200}}
          />
          <View style={styles.badgeView}>
            <Text style={styles.activeBadge}>Last Earned Badge</Text>
            {/* <Text style={styles.detailBadge}>Samet Ipsum Dolor So</Text> */}
          </View>
        </View>
        <FlatList
          refreshing={false}
          numColumns={3}
          bounces={false}
          data={all_badges}
          onRefresh={getBadges}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
          // ListEmptyComponent={
          //   <EmptyComponent
          //     title="Ooopss!"
          //     padding={true}
          //     description="Badges"
          //     // onRefresh={onRefresh}
          //   />
          // }
        />
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(Badges);
