import { StyleSheet } from 'react-native';
import { black } from 'styles/theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  baseFontSize,
  smallFontSize,
  largeHeaderFontSize,
  largeFontSize,
} from 'styles/typography';

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: Colors.lighter,
  },
  close: {
    height: 34,
    width: 34,
    position: 'absolute',
    top: 12,
    right: 12,
  },
  closeImage: {
    shadowColor: black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: '100%',
    width: '100%',
  },
  componentContainer: {
    paddingBottom: 40,
  },
  highlight: {
    fontWeight: '700',
  },
  modalText: {
    fontSize: smallFontSize,
    textAlign: 'center',
    marginBottom: 32,
  },
  modalTitle: {
    fontSize: baseFontSize,
    fontWeight: '600',
    color: black,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalView: {
    position: 'relative',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    minHeight: '50%',
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: largeFontSize,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: largeHeaderFontSize,
    fontWeight: '400',
  },
  subtitle: {
    fontSize: baseFontSize,
    fontWeight: '600',
    color: black,
    marginBottom: 48,
  },
  title: {
    fontSize: largeHeaderFontSize,
    fontWeight: '600',
  },
  label: {
    fontSize: baseFontSize,
    fontWeight: '600',
    color: black,
    marginBottom: 12,
    marginTop: 12,
  },
  input: {
    fontSize: baseFontSize,
    fontWeight: '400',
    color: black,
    marginBottom: 12,
    marginTop: 12,
  },
  link: {
    fontSize: baseFontSize,
    fontWeight: '400',
    color: black,
    marginBottom: 12,
    marginTop: 12,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 36,
    marginBottom: 36,
  },
});

const colors = {
  placeholder: '#9B9B9B',
}

export { 
  styles,
  colors,
};
