import React, {useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {Modalize} from 'react-native-modalize';
import PageHeading from '@/components/PageHeading';
import WalletCard from '@/components/WalletCard';
import {walletData} from '@/utils/helper/LocalDb';
import {modalAdStyles, overlayStyle} from '@/theme/Variables';
import {normal} from '@/Assets/lottie';
import ModalAds from '@/components/ModalAds';
import WalletHeader from './WalletHeader';
import useWallet from './useWallet';
import {styles} from './styles';
import {randomNanoIdGenerator} from '@/utils/helper';
import AnimatedBackground from '@/components/AnimatedBackground';

const Wallet = ({navigation, route}) => {
  const {user, data, modalizeRef, onOpen, onClose} = useWallet({
    navigation,
    route,
  });

  const renderItem = useCallback(
    ({item}) => <WalletCard {...{item}} />,
    [walletData],
  );

  return (
    <AnimatedBackground animation={normal}>
      <PageHeading {...{title: data?.title, navigation, backButton: true}} />
      <View style={styles.container}>
        <WalletHeader {...{user, onOpen}} />
        <FlatList
          // ListHeaderComponent={<>{<WalletHeader {...{user, onOpen}} />}</>}
          // stickyHeaderIndices={[0]}
          data={walletData}
          renderItem={renderItem}
          keyExtractor={randomNanoIdGenerator}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Modalize
        ref={modalizeRef}
        modalHeight={280}
        withHandle={false}
        closeOnOverlayTap={true}
        modalStyle={modalAdStyles}
        overlayStyle={overlayStyle}>
        <ModalAds {...{onClose}} />
      </Modalize>
    </AnimatedBackground>
  );
};

export default React.memo(Wallet);
