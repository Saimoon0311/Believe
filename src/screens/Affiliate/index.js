import React from 'react';
import {View, Image, Text} from 'react-native';
import {dollar, front} from '@/Assets/Images';
import {normal} from '@/Assets/lottie';
import useAffiliate from './useAffiliate';
import PageHeading from '@/components/PageHeading';
import {Touchable} from '@/components/Touchable';
import {styles} from './styles';
import AnimatedBackground from '@/components/AnimatedBackground';

const Affiliate = ({navigation, route}) => {
  const {data, viewRefer} = useAffiliate({navigation, route});

  const title = data?.title;

  return (
    <AnimatedBackground animation={normal}>
      <PageHeading {...{title, navigation, backButton: true}} />
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Image source={dollar} />
          <View style={styles.referHeading}>
            <Text style={styles.reffer}>Reffer Anyone & Get</Text>
            <Text style={styles.amount}>$45</Text>
          </View>
          <Text style={styles.text}>Your referral code</Text>
          <View style={styles.referBox}>
            <View style={styles.codeContainer}>
              <Text style={styles.referText}>NABOCKl09</Text>
            </View>
            <Touchable Opacity={0.7} style={styles.shareButton}>
              <Text style={styles.shareText}>Share</Text>
            </Touchable>
          </View>
          <Touchable
            onPress={viewRefer}
            Opacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.viewText}>View my referral</Text>
            <Image source={front} style={styles.icon} />
          </Touchable>
        </View>
      </View>
    </AnimatedBackground>
  );
};

export default React.memo(Affiliate);
