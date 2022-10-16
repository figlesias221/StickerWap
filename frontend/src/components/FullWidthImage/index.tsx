/* eslint-disable operator-linebreak */
import React, { useState } from 'react';

import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  View,
} from 'react-native';

import { black } from '../../styles/theme';
import styles from './styles';

const FullWidthImage = ({
  image,
  initialWidth = '100%',
  setErrorLoadImage,
}: {
  image: ImageSourcePropType;
  initialWidth?: string | number;
  setErrorLoadImage?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [{ height, width }, setDimensions] = useState({ height: 0, width: 0 });

  return (
    <View
      style={{
        width: initialWidth,
        height: isLoading ? initialWidth : undefined,
      }}
      onLayout={({
        nativeEvent: {
          layout: { width: layoutWidth },
        },
      }) => {
        if (!layoutWidth) return;
        if ((image as any).uri) {
          Image.getSize(
            (image as any).uri,
            (widthFunc, heightFunc) => {
              setDimensions({
                width: layoutWidth,
                height: heightFunc * (layoutWidth / widthFunc),
              });
            },
            () => {
              setIsLoading(false);
              if (setErrorLoadImage) setErrorLoadImage();
            },
          );
          return;
        }
        const { width: widthFunc, height: heightFunc } =
          Image.resolveAssetSource(image);
        setDimensions({
          width: layoutWidth,
          height: heightFunc * (layoutWidth / widthFunc),
        });
      }}
    >
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={black} />
        </View>
      )}
      <Image
        source={image}
        style={{ height, width }}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
};

export default FullWidthImage;
