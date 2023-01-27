import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {back, favorite, unFavorite} from '@/Assets/Images';
import {Colors, FontFamily} from '@/theme/Variables';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CircularProgress from 'react-native-circular-progress-indicator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Lottie from 'lottie-react-native';
import {imageLoader, tick} from '@/Assets/lottie';
import ProgressCircle from 'react-native-progress-circle';
import * as Progress from 'react-native-progress';
import branch from 'react-native-branch';

const ContentFavorite = ({
  data,
  onPress,
  navigation,
  isSeries,
  isDownload,
  isCompleted,
  startDownload,
  progressVlaue,
  cancelDownloadFun,
  checkFile,
  imageDownload,
}) => {
  const shareMusic = async () => {
    console.log(data);
    try {
      const branchUniversalObject = await branch.createBranchUniversalObject(
        `${data?.type || ''}/content/${data?.id}`,
        {
          locallyIndex: true,
          title: data?.title,
          contentDescription: data?.description,
          contentImageUrl: data?.image || data?.cover_image,
          contentMetadata: {
            customMetadata: {
              content_data: JSON.stringify(data),
            },
          },
        },
      );

      const linkProperties = {
        feature: 'share',
        channel: 'content_share',
      };

      const controlParams = {
        $desktop_url: 'https://believe-website.staginganideos.com',
        $ios_url:
          'https://apps.apple.com/us/app/hypnocloud-hypnotherapy-app/id1450270910',
        $android_url:
          'https://play.google.com/store/apps/details?id=com.anideos.believe',
      };

      branchUniversalObject.showShareSheet({}, linkProperties, controlParams);
    } catch (error) {
      console.log('onShare error', error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Image source={back} style={styles.back} />
      </TouchableOpacity>
      {/* <Text numberOfLines={1} style={styles.heading}>
  {data?.name}
</Text> */}
      <View
        style={{flexDirection: 'row', marginRight: widthPercentageToDP('-6')}}>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={Boolean(isSeries)}
          style={styles.icon(isSeries)}
          // onPress={shareMusic}
          onPress={onPress}>
          <Image
            source={data?.is_favorite ? favorite : unFavorite}
            style={styles.heartImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={Boolean(isSeries)}
          style={styles.icon(isSeries)}
          onPress={shareMusic}
          // onPress={onPress}
        >
          <Feather
            name="share-2"
            color={Colors.white}
            size={heightPercentageToDP('2')}
          />
        </TouchableOpacity>
        {isDownload ? (
          <View style={styles.icon(false)}>
            <Progress.Circle
              unfilledColor={'white'}
              color={Colors.greenFaded}
              borderWidth={0}
              progress={progressVlaue / 100}
              size={30}>
              <Entypo
                name="cross"
                color={'white'}
                onPress={cancelDownloadFun}
                size={heightPercentageToDP('2.5')}
                style={{
                  position: 'absolute',
                  top: heightPercentageToDP('0.5'),
                  left: widthPercentageToDP('1'),
                }}
              />
            </Progress.Circle>
          </View>
        ) : isCompleted ? (
          <Lottie
            source={tick}
            autoPlay
            resizeMode="cover"
            loop={false}
            style={[
              styles.icon(isSeries),
              {marginLeft: widthPercentageToDP('-2')},
            ]}
          />
        ) : imageDownload ? (
          <Lottie
            source={imageLoader}
            autoPlay
            resizeMode="cover"
            loop={true}
            style={[
              styles.icon(false),
              {
                marginLeft: widthPercentageToDP('-4'),
                marginRight: widthPercentageToDP('-1.5'),
                marginTop: heightPercentageToDP('0.7'),
                height: heightPercentageToDP('4'),
              },
            ]}
          />
        ) : (
          !checkFile && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.icon,
                {
                  marginRight: widthPercentageToDP('4'),
                  alignItems: 'center',
                  marginLeft: widthPercentageToDP('-3'),
                  justifyContent: 'center',
                },
              ]}
              onPress={startDownload}>
              <Ionicons
                name="arrow-down-outline"
                color={'white'}
                size={heightPercentageToDP('3')}
              />
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

export default ContentFavorite;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  heading: {
    width: '80%',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.white,
    paddingVertical: 20,
    fontFamily: FontFamily.medium,
  },
  icon: isSeries => ({
    width: widthPercentageToDP('13'),
    height: 50,
    justifyContent: 'center',
    // alignItems: 'f',
    opacity: isSeries ? 0 : 1,
  }),
  back: {
    width: 20,
    height: 20,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  heartImage: {height: 20, width: 20, resizeMode: 'contain'},
});
