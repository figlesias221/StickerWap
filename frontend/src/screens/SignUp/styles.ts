import { StyleSheet } from 'react-native';
import { black, green, screenHeight } from 'styles/theme';
import { largeHeaderFontSize } from 'styles/typography';

const styles = StyleSheet.create({
  formContainer: {
    width: '80%',
    alignSelf: 'center',
    marginTop: '15%',
  },
  title: {
    fontSize: largeHeaderFontSize,
    fontWeight: '600',
  },
  label: {
    fontSize: screenHeight * 0.02,
    fontWeight: '300',
    marginBottom: screenHeight * 0.012,
    marginTop: screenHeight * 0.012,
    fontFamily: 'Avenir',
  },
  error: {
    color: 'red',
    fontSize: screenHeight * 0.02,
    fontWeight: '300',
    marginBottom: screenHeight * 0.012,
    marginTop: screenHeight * 0.012,
    fontFamily: 'Avenir',
  },
  subtitle: {
    fontWeight: 'bold',
    color: green,
    marginBottom: screenHeight * 0.03,
    fontSize: screenHeight * 0.05,
  },
  input: {
    fontSize: screenHeight * 0.018,
    fontWeight: '400',
    marginBottom: screenHeight * 0.005,
    marginTop: screenHeight * 0.005,
    borderWidth: 0.5,
    padding: 12,
    borderRadius: 4,
  },
  link: {
    fontSize: screenHeight * 0.015,
    fontWeight: '600',
    color: black,
    marginLeft: '2%',
  },
  buttonContainer: {
    marginTop: screenHeight * 0.04,

    width: '100%',
  },
  createAccountContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export { styles };
