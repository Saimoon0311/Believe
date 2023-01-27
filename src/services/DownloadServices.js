import {FileSystem, Dirs} from 'react-native-file-access';

// const {AllPaths} = require('@/config/constants');
// const {PermissionsAndroid, Platform} = require('react-native');
// const {default: ReactNativeBlobUtil} = require('react-native-blob-util');

// const {config, fs} = ReactNativeBlobUtil;
// const {mkdir, exists, unlink} = fs;
// const createFolders = async (fileUrl, filePath, getPregress) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const allMap = AllPaths.map(async res => {
//         const exist = await exists(res);
//         if (!exist) {
//           const create = await mkdir(res);
//           console.log('create', create);
//         } else console.log('Already exists paths');
//       });
//       await Promise.all(allMap);
//       resolve({folderCreated: true, error: null});
//     } catch (error) {
//       console.log('err', error);
//       reject({folderCreated: false, error: error?.message || error});
//     }
//   });
//   // download(fileUrl, filePath, getPregress);
// };
// const checkPermission = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (Platform.OS === 'ios') downloadFile(fileUrl, filePath, getPregress);
//       else {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'Storage Permission Required',
//             message:
//               'Application needs access to your storage to download File',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED)
//           resolve({ok: true, error: null});
//         else {
//           reject({ok: false, error: 'Storage Permission Not Granted'});
//           alert('Please give permission to download files');
//         }
//       }
//     } catch (error) {
//       reject({ok: false, error: error?.message || error});
//       alert(error?.message);
//     }
//   });
// };

// const downloadFile = (fileUrl, filePath, getPregress, getTaskData) => {
//   return new Promise(async (resolve, reject) => {
//     // Get today's date to add the time suffix in filename
//     let date = new Date();
//     // File URL which we want to download
//     let FILE_URL = fileUrl;
//     // Function to get extention of the file url
//     let file_ext = getFileExtention(FILE_URL);

//     file_ext = '.' + file_ext[0];
//     // config: To get response by passing the downloading related options
//     // fs: Root directory path to download
//     let options = {
//       fileCache: true,
//       addAndroidDownloads: {
//         path: filePath + Math.floor(date.getTime() + date.getSeconds() / 2),
//         file_ext,
//         description: 'downloading file...',
//         notification: true,
//         // useDownloadManager works with Android only
//         useDownloadManager: true,
//         mime: file_ext,
//       },
//     };
//     const task = config(options).fetch('GET', FILE_URL);
//     getTaskData(task);
//     task.progress((received, total) => {
//       let percentage = Math.floor((received / total) * 100);
//       getPregress(percentage);
//     });
//     task.then(res => {
//       getPregress(100);
//       resolve({ok: true, path: res.path()});
//     });
//     task.catch(e => {
//       console.log(143, e);
//       reject(e);
//     });
//   });
// };
// const getFileExtention = fileUrl => {
//   // To get the file extension
//   return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
// };

// const cancelDownload = task => {
//   task.cancel(err => {
//     console.log('task cancel', err);
//   });
// };

const getFileExtension = url =>
  url.substring(url.lastIndexOf('/') + 1, url.length);

const getUrlExtention = filename => {
  // To get the file extension
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
};

const cacheMedia = (url, callBack) => {
  // FileSystem.fetch(
  //   url,
  //   {path: Dirs.CacheDir + getFileExtension(url)},
  //   callBack,
  // );
  return FileSystem.fetchManaged(
    url,
    {
      path: Dirs.CacheDir + '/' + getFileExtension(url),
    },
    (onProgress = e => console.log(e)),
  );
};

const getCacheMedia = url =>
  FileSystem.stat(Dirs.CacheDir + '/' + getFileExtension(url));

export const hashMedia = path => FileSystem.hash(path, 'SHA-256');

export const hasDownloaded = path => FileSystem.exists(path);

const deleteFiles = async filepath => {
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     const exist = await FileSystem.exists(filepath);
  //     if (exist) {
  //       console.log('qaefafdsfsdfasdfasd', filepath, exist);
  //       const unlinkFiles = await FileSystem.unlink(filepath);
  //       console.log('file deleted', unlinkFiles);
  //       resolve({fileDeleted: true, error: null});
  //     } else console.log('file not exists');
  //   } catch (error) {
  //     console.log('err', error);
  //     reject({folderCreated: false, error: error?.message || error});
  //   }
  // });
  FileSystem.exists(filepath)
    .then(async result => {
      console.log('file exists: ', result);

      if (result) {
        return (
          FileSystem.unlink(filepath)
            .then(() => {
              console.log('FILE DELETED');
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch(err => {
              console.log(err.message);
            })
        );
      }
    })
    .catch(err => {
      console.log(err.message);
    });
};

const deleteAllFiles = async filepath => {
  return new Promise(async (resolve, reject) => {
    try {
      const allMap = filepath.map(async res => {
        const exist = await FileSystem.exists(res);
        if (exist) {
          const unlinkFiles = await FileSystem.unlink(res);
          console.log('file deleted', unlinkFiles);
        } else console.log('file not exists');
      });
      await Promise.all(allMap);
      resolve({folderCreated: true, error: null});
    } catch (error) {
      console.log('err', error);
      reject({folderCreated: false, error: error?.message || error});
    }
  });
};

// export {createFolders, cancelDownload, deleteFiles};
export {
  deleteFiles,
  getUrlExtention,
  cacheMedia,
  getCacheMedia,
  deleteAllFiles,
};

// export const fileDownloader = async (
//   fileUrl,
//   filePath,
//   getPregress,
//   getTaskData,
// ) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       await checkPermission();
//       await createFolders();
//       const {path} = await downloadFile(
//         fileUrl,
//         filePath,
//         getPregress,
//         getTaskData,
//       );
//       resolve({ok: true, path});
//     } catch (error) {
//       reject({ok: false});
//     }
//   });
// };
