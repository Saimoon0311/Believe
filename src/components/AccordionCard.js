import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize} from '@/theme/Variables';
import * as images from '@/Assets/Images';
import SubscribeCheck from './SubscribeCheck';

const AccordionCard = ({item, onPress}) => (
  <SubscribeCheck style={styles.listView} item={item} onPress={onPress}>
    <View style={styles.container}>
      <View>
        <Text numberOfLines={2} style={styles.title}>
          {item?.title}
        </Text>
      </View>
      <View style={styles.topRow}>
        <Image source={images[item?.type]} style={styles.album} />
        <View style={styles.artistList}>
          <Text numberOfLines={1} style={styles.type}>
            {item?.type}
          </Text>
          <Text numberOfLines={1} style={styles.duration}>
            {item?.time}
          </Text>
        </View>
      </View>
    </View>
  </SubscribeCheck>
);

export default React.memo(AccordionCard);

const styles = StyleSheet.create({
  listView: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  container: {
    width: '90%',
    marginTop: -10,
  },
  album: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.white2,
  },
  artistList: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    color: Colors.white2,
    fontSize: FontSize.large,
    fontFamily: FontFamily.regular,
  },
  topRow: {
    marginTop: 10,
    flexDirection: 'row',
  },
  type: {
    textAlign: 'left',
    color: Colors.white2,
    textTransform: 'uppercase',
    fontSize: FontSize.default,
    fontFamily: FontFamily.regular,
    opacity: 0,
  },
  duration: {
    paddingLeft: 2.5,
    marginTop: '1.5%',
    textAlign: 'left',
    color: Colors.white2,
    fontSize: FontSize.medium,
    fontFamily: FontFamily.regular,
  },
  status: {
    color: Colors.white2,
    textAlign: 'center',
    fontSize: FontSize.medium,
    fontFamily: FontFamily.medium,
  },
  line: {
    opacity: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.bottomLine,
  },
});
