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
  error: {
    color: 'red',
    fontSize: baseFontSize,
    marginTop: screenHeight * 0.01,
    fontFamily: 'Raleway-Medium',
  },
  logoText: {
    fontSize: screenHeight * 0.03,
    color: green,
    fontFamily: 'Raleway-Bold',
  },
  componentContainer: {
    paddingVertical: 20,
  },
  subtitle: {
    color: green,
    marginBottom: screenHeight * 0.03,
    fontSize: screenHeight * 0.05,
    fontFamily: 'Raleway-Bold',
  },
  title: {
    fontSize: largeHeaderFontSize,
    fontWeight: '600',
  },
  label: {
    fontSize: screenHeight * 0.02,
    marginBottom: screenHeight * 0.012,
    marginTop: screenHeight * 0.012,
    fontFamily: 'Raleway',
  },
  createLabel: {
    fontSize: screenHeight * 0.02,
    marginBottom: screenHeight * 0.012,
    marginTop: screenHeight * 0.012,
    fontFamily: 'Raleway',
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
    fontFamily: 'Raleway-Bold',
  },
  link: {
    fontSize: screenHeight * 0.015,
    color: black,
    marginLeft: '2%',
    fontFamily: 'Raleway-Bold',
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
