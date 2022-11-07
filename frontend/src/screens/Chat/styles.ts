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
    fontSize: screenHeight * 0.05,
    fontFamily: 'Raleway-Bold',
    marginTop: screenHeight * 0.02,
    marginLeft: screenHeight * 0.04,
  },
  chatlistContainer: {
    paddingHorizontal: 10,
    marginBottom: 80,
    marginTop: 20,
  },
  chatemptyContainer: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontFamily: 'Raleway',
  },
});

export default styles;
