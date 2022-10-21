import { useWindowDimensions } from 'react-native';

export const useScreenDimensions = () => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;

  return { screenWidth, screenHeight };
};
