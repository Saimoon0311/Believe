import React, {Fragment} from 'react';
import {addPlaylist, playButton} from '@/Assets/Images';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize} from '@/theme/Variables';
import BlurImage from './BlurImage';
import {contentTime} from '@/utils/helper';
import SubscribeCheck from './SubscribeCheck';
import {Touchable} from './Touchable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const SeriesCard = ({
  item,
  data,
  onPress,
  addIcon,
  onAddPlaylist,
  onRemovePlaylist,
  AudioList,
}) => {
  return (
    <Fragment>
      {Boolean(item?.cat_id || item?.id == data?.id) && (
        <SubscribeCheck
          style={[
            styles.listView,
            {padding: 0, backgroundColor: 'transparent'},
          ]}
          onPress={onPress}
          item={item}>
          <View style={styles.listView}>
            <View style={styles.rowStart}>
              <BlurImage
                uri={item?.image}
                styles={styles.album}
                blurhash={item?.hash_code}
              />
              <View style={styles.artistList}>
                <Text numberOfLines={1} style={styles.name}>
                  {item?.name}
                </Text>
                <Text numberOfLines={1} style={styles.description}>
                  {item?.description}
                </Text>
                <Text style={styles.duration}>
                  {contentTime(item?.duration)}sec
                </Text>
              </View>
            </View>
            {addIcon ? (
              <Touchable onPress={() => onAddPlaylist(item)}>
                <Image source={addPlaylist} style={styles.icons} />
              </Touchable>
            ) : (
              <Image source={playButton} style={styles.icons} />
            )}
          </View>
        </SubscribeCheck>
      )}
    </Fragment>
  );
};

export default React.memo(SeriesCard);

const styles = StyleSheet.create({
  listView: {
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryFaded,
    height: 90,
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  album: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  artistList: {
    width: '67%',
    marginLeft: 10,
    justifyContent: 'space-between',
    height: 60,
  },
  name: {
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.medium,
  },
  description: {
    fontSize: 12,
    width: '87.5%',
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  duration: {
    fontSize: 12,
    textAlign: 'left',
    color: Colors.lightGray2,
    fontFamily: FontFamily.regular,
  },
  button: {
    width: 40,
    height: 30,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: Colors.greenFaded,
    marginRight: 10,
  },
});
