import { Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import styles from './styles';

const openUrl = async (url: string) => {
  try {
    const isAvailable = await InAppBrowser.isAvailable();
    if (isAvailable) {
      try {
        await InAppBrowser.open(url, styles);
      } catch (e) {
        Linking.openURL(url);
      }
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    Linking.openURL(url);
  }
};

export default openUrl;
