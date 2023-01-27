import Share from 'react-native-share';
import {captureRef} from 'react-native-view-shot';

/**
 * It takes a ref, a message, a title, a callback, and an error handler, and then it captures the ref
 * as a base64 image, and then it opens the share dialog with the base64 image as the url, and then it
 * calls the callback
 * @param ref - The ref of the component you want to capture.
 * @param [message=Believe App Stats] - The message to be shared.
 * @param [title=Believe App Stats] - The title of the share sheet
 * @param [callBack] - This is the function that will be called when the user successfully shares the
 * image.
 * @param [onError] - This is a callback function that will be called if there is an error while
 * sharing.
 */
export const shareStats = async (
  ref,
  message = 'Believe App Stats',
  title = 'Believe App Stats',
  callBack = () => console.log('callback'),
  onError = error => console.log('onError', error),
) => {
  try {
    const base64 = await captureRef(ref, {
      result: 'base64',
      format: 'png',
      quality: 0.8,
    });
    const base64Data = `data:image/png;base64,` + base64;
    await Share.open({
      url: base64Data,
      message,
      title,
      type: 'image/png',
      showAppsToView: true,
      failOnCancel: false,
    });
    callBack();
  } catch (error) {
    onError(error);
  }
};
