import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorySection: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    padding: 20,
    borderBottomColor: '#FFF0F0',
    borderBottomWidth: 8,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  stickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sticker: {
    width: 55,
    height: 80,
    margin: 5,
  },
  stickerTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 5,
  },
  stickerCount: {
    fontSize: 12,
    textAlign: 'center',
    margin: 2,
  },
  bigHeader: {
    fontSize: 40,
    fontWeight: '800',
    color: '#F2F2F2',
    textAlign: 'left',
    margin: 20,
    width: '100%',
    height: 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    height: 90,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  }
});

export default styles;
