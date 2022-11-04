import { StyleSheet } from 'react-native';
import { green, screenHeight } from 'styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  subtitle: {
    color: green,
    marginBottom: screenHeight * 0.02,
    fontSize: screenHeight * 0.05,
    fontFamily: 'Raleway-Bold',
    marginTop: screenHeight * 0.02,
    marginLeft: screenHeight * 0.04,
  },
});

export default styles;
