import { StyleSheet } from 'react-native';
import { white } from 'styles/theme';

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    backgroundColor: white,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default styles;
