import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {Touchable} from '@/components/Touchable';

const AffiliateCard = ({item, index, onPress}) => {
  return (
    <View key={index} style={styles.listView}>
      <View style={styles.row}>
        <Image source={item?.image} style={styles.album} />
        <View style={styles.artistList}>
          <Text numberOfLines={1} style={styles.name}>
            {item?.title}
          </Text>
        </View>
        <Touchable
          Opacity={0.7}
          style={[
            styles.statusButton,
            {
              backgroundColor: item?.completed
                ? Colors.greenFaded
                : Colors.redFade,
            },
          ]}
          onPress={onPress}>
          <Text numberOfLines={1} style={styles.status}>
            {item?.status}
          </Text>
        </Touchable>
      </View>
    </View>
  );
};

export default React.memo(AffiliateCard);

const styles = StyleSheet.create({
  listView: {
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    // height: Sizes.height * 0.1,
    justifyContent: 'space-between',
    backgroundColor: Colors.transparent,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  album: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.border,
  },
  artistList: {
    width: '56%',
    marginTop: 7.5,
    marginLeft: 10,
  },
  name: {
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.medium,
  },
  statusButton: {
    width: 85,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: FontSize.medium,
    fontFamily: FontFamily.medium,
  },
});
