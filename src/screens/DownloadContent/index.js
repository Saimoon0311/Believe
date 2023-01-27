import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {eBooks} from '@/Assets/Images';
import ContentHeading from '@/components/ContentHeading';
import useDownloadContent from './useDownloadContent';
import {Touchable} from '@/components/Touchable';
import BlurImage from '@/components/BlurImage';
import SafeView from '@/components/SafeView';
import {Colors} from '@/theme/Variables';
import {styles} from './styles';
import {normal} from '@/Assets/lottie';
import AnimatedBackground from '@/components/AnimatedBackground';

const DownloadContent = ({navigation, route}) => {
  const {data, downloadFile} = useDownloadContent(navigation, route);
  return (
    <AnimatedBackground animation={normal}>
      <SafeView>
        <ContentHeading
          {...{title: data?.title, navigation, backButton: true}}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.descriptionLine}>
              {/* <Text style={styles.description}>{data?.description}</Text> */}
            </View>
            <Touchable onPress={downloadFile} style={styles.subContainer}>
              <BlurImage
                uri={data?.image}
                styles={styles.image}
                blurhash={data?.hash_code}
              />
              <View style={styles.card}>
                <Image
                  source={eBooks}
                  style={[
                    styles.icon,
                    {
                      tintColor: Colors.white,
                    },
                  ]}
                />
                <Text style={styles.text}>{data?.title}</Text>
              </View>
            </Touchable>
            {/* <View style={styles.center}>
              <Touchable onPress={downloadFile} style={styles.button}>
                <Image source={download} style={styles.icon} />
                <Text style={styles.download}>Download</Text>
              </Touchable>
            </View> */}
          </View>
        </ScrollView>
      </SafeView>
    </AnimatedBackground>
  );
};

export default React.memo(DownloadContent);
