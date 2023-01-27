// import ReactNativeBlobUtil from 'react-native-blob-util';
import {Linking} from 'react-native';
// import {writePermission} from '@/hooks/useWritePermission';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
// import {getUrlExtention} from '@/utils/helper';
import {Colors} from '@/theme/Variables';
// const isIos = Platform.OS == 'ios';
// const OsVer = Platform.constants['Release'];
const useDownloadContent = (navigation, {params}) => {
  const {url, title, description} = params;
  // const {fs, config, ios, MediaCollection} = ReactNativeBlobUtil;
  // const dirToSave = isIos ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;

  const downloadFile = async () => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'done',
          preferredBarTintColor: Colors.primaryColor,
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: Colors.primaryColor,
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      console.log('error', error);
    }

    // try {
    //   const ext = getUrlExtention(url);
    //   const path =
    //     OsVer > 9 && Platform.OS == 'android'
    //       ? fs.dirs.DCIMDir + getUrlExtention(url)
    //       : `${dirToSave}/${title}.${ext}`;
    //   const configOptions = {
    //     fileCache: true,
    //     addAndroidDownloads: {
    //       path,
    //       title,
    //       useDownloadManager: true,
    //       notification: true,
    //       description,
    //     },
    //     timeout: 10000,
    //     path,
    //     indicator: true,
    //   };
    //   if (isIos) await download(configOptions, url);
    //   else {
    //     const res = await writePermission();
    //     if (res) await download(configOptions, url);
    //   }
    // } catch (error) {
    //   console.log(error, 'kooooool');
    // }
  };

  // const download = async (configOptions, url) => {
  //   const file = await config(configOptions).fetch('GET', url);
  //   if (isIos) ios.previewDocument(file.path());
  //   else if (OsVer > 9)
  //     await MediaCollection.copyToMediaStore(
  //       {
  //         name: `${title}.${getUrlExtention(url)}`,
  //         parentFolder: '',
  //         mimeType: getUrlExtention(url),
  //       },
  //       'Download',
  //       file.path(),
  //     );
  // };

  return {data: params, downloadFile};
};

export default useDownloadContent;
