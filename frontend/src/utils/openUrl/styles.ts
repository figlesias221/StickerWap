import { primary, white } from 'styles/theme';

const styles = {
  dismissButtonStyle: 'cancel',
  preferredBarTintColor: white,
  preferredControlTintColor: primary,
  readerMode: false,
  animated: true,
  modalPresentationStyle: 'fullScreen',
  modalTransitionStyle: 'coverVertical',
  modalEnabled: true,
  enableBarCollapsing: false,
  showTitle: true,
  toolbarColor: primary,
  secondaryToolbarColor: 'black',
  enableUrlBarHiding: true,
  enableDefaultShare: true,
  forceCloseOnRedirection: false,
  animations: {
    startEnter: 'slide_in_right',
    startExit: 'slide_out_left',
    endEnter: 'slide_in_left',
    endExit: 'slide_out_right',
  },
};

export default styles;
