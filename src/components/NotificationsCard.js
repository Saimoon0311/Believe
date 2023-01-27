import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {Touchable} from '@/components/Touchable';

const NotificationsCard = ({item, onPress}) => {
  return (
    <Touchable Opacity={0.7} onPress={onPress} style={styles.listView}>
      <View style={styles.row}>
        <Image source={item?.image} style={styles.album} />
        <View style={styles.artistList}>
          <View style={styles.rowEnd}>
            <Text numberOfLines={1} style={styles.name}>
              {item?.title}
            </Text>
            <Text style={styles.time}>{item?.time}</Text>
          </View>
          <View style={styles.bottomPara}>
            <Text numberOfLines={4} style={styles.description}>
              {item?.description}
            </Text>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

export default React.memo(NotificationsCard);

const styles = StyleSheet.create({
  listView: {
    // height: 70,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  album: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  artistList: {
    width: '82.5%',
    marginTop: 7.5,
    marginLeft: 10,
  },
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  name: {
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.medium,
  },
  bottomPara: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  description: {
    width: '77.5%',
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.light,
  },
  time: {
    textAlign: 'right',
    color: Colors.white,
    fontSize: FontSize.large,
    fontFamily: FontFamily.light,
  },
});
