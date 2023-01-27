import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {Colors, FontFamily} from '@/theme/Variables';
import PlaylistListing from './PlaylistListing';
import {Touchable} from './Touchable';
import {plus} from '@/Assets/Images';
import PlaylistCard from './PlaylistCard';
import {keyExtractor} from '@/utils/helper';

const PlaylistOption = ({title, playlistData, onAddOpen, onPlaylistClose}) => {
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.heading}>
        {title}
      </Text>
      <View style={styles.subContainer}>
        <Touchable Opacity={0.7} style={styles.button} onPress={onAddOpen}>
          <Text style={styles.text}>Create New</Text>
          <Image source={plus} />
        </Touchable>
      </View>
      {Boolean(playlistData?.length) && (
        <View>
          <View style={styles.bottom}>
            <Text style={styles.bottomText}>Add to existing playlist</Text>
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            showsVerticalScrollIndicator={false}>
            {playlistData.map((item, index) => (
              <PlaylistCard
                key={index}
                {...{item, index, onPress: onPlaylistClose}}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default PlaylistOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // backgroundColor: Colors.darkFaded,
  },
  subContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    textAlign: 'center',
    color: Colors.greenFaded,
    fontFamily: FontFamily.medium,
  },
  button: {
    paddingVertical: 15,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
    borderBottomColor: Colors.blurWhite,
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  bottom: {
    marginVertical: 20,
  },
  bottomText: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
  },
});
