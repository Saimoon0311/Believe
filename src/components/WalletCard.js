import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, Sizes} from '@/theme/Variables';
import {Touchable} from '@/components/Touchable';
import {walletCard} from '@/Assets/Images';

const WalletCard = ({item, onPress}) => {
  return (
    <Touchable Opacity={1} style={styles.listView}>
      <Image source={walletCard} style={styles.background} />
      <View style={styles.textContainer}>
        <View style={styles.artistList}>
          <View style={styles.rowEnd}>
            <Text style={styles.discount}>{item?.discount}</Text>
            <Text numberOfLines={1} style={styles.store}>
              {` on ${item?.store}`}
            </Text>
          </View>
          <Text numberOfLines={2} style={styles.cost}>
            {`Gift Card Cost ${item?.cost} Coins`}
          </Text>
          <View style={styles.bottomPara}>
            <Text style={styles.expiry}>{`Expires ${item?.expiry}`}</Text>
            <Touchable Opacity={0.7} onPress={onPress} style={styles.button}>
              <Text style={styles.buttonText}>Redeem</Text>
            </Touchable>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

export default React.memo(WalletCard);

const styles = StyleSheet.create({
  listView: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    top: 0,
    bottom: 0,
    zIndex: 1,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },
  background: {
    height: 140,
    width: '100%',
    borderRadius: 10,
  },
  artistList: {
    width: '90%',
    marginHorizontal: 20,
  },
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  discount: {
    fontSize: 28,
    textAlign: 'left',
    color: Colors.yellow,
    fontFamily: FontFamily.medium,
  },
  store: {
    textAlign: 'left',
    marginBottom: 2.5,
    color: Colors.white,
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.medium,
  },
  bottomPara: {
    paddingBottom: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cost: {
    paddingTop: 5,
    // width: '77.5%',
    paddingBottom: 10,
    textAlign: 'left',
    color: Colors.white,
    fontSize: FontSize.default,
    fontFamily: FontFamily.regular,
  },
  expiry: {
    textAlign: 'right',
    color: Colors.white,
    fontSize: FontSize.default,
    fontFamily: FontFamily.regular,
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.greenFaded,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontFamily: FontFamily.medium,
  },
});
