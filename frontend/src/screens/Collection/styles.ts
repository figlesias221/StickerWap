import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 10, 
    backgroundColor: '#04B600',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  categorySection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  
    borderBottomColor: 'blue',
    borderBottomWidth: 10,
    backgroundColor: 'yellow',
    width: '100%',
    paddingBottom: 100,
  }
});

export default styles;
