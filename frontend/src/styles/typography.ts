import { white } from 'styles/theme';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

// font sizes - TODO: validate font styles with design team
export const extraLargeFontSize = 32;
export const largeFontSize = 24;
export const headerFontSize = 24;
export const largeHeaderFontSize = 20;
export const buttonFontSize = 18;
export const baseFontSize = 16;
export const smallFontSize = 14;
export const smallestFontSize = 12;
export const navbarFontSize = 10;
export const buttonSmallFontSize = 8;

// font styles:
export const buttonText: ViewStyle | TextStyle | ImageStyle = {
  fontSize: buttonFontSize,
  fontWeight: '600',
  textTransform: 'uppercase',
  color: white,
};
