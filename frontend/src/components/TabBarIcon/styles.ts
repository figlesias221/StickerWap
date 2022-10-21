import { StyleSheet } from 'react-native';
import { gray, primary } from 'styles/theme';
import { smallestFontSize } from 'styles/typography';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 20,
  },
  textActive: {
    fontSize: smallestFontSize,
    color: primary,
    marginTop: 9,
  },
  textInactive: {
    fontSize: smallestFontSize,
    color: gray,
    marginTop: 9,
  },
});

export default styles;
