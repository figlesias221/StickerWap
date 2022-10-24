import { StyleSheet } from 'react-native';
import { green, black, screenHeight } from 'styles/theme';
import { baseFontSize, largeHeaderFontSize } from 'styles/typography';

const styles = StyleSheet.create({
  formContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.01,
    marginBottom: '15%',
  },
  logo: {
    height: screenHeight * 0.05,
    width: screenHeight * 0.05,
  },
  logoText: {
    fontSize: screenHeight * 0.03,
    fontWeight: 'bold',
    color: green,
    fontFamily: 'Avenir',
  },
  componentContainer: {
    paddingVertical: 20,
  },
  subtitle: {
    fontWeight: 'bold',
    color: green,
    marginBottom: screenHeight * 0.03,
    fontSize: screenHeight * 0.05,
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
  createLabel: {
    fontSize: screenHeight * 0.02,
    fontWeight: '300',
    marginBottom: screenHeight * 0.012,
    marginTop: screenHeight * 0.012,
    fontFamily: 'Avenir',
    color: '#898989',
  },
  input: {
    fontSize: baseFontSize,
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
    marginBottom: '3%',
    width: '100%',
  },
  createAccountContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const colors = {
  placeholder: '#9B9B9B',
};

export { styles, colors };
