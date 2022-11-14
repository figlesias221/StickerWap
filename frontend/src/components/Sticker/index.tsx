import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';
import { newShade } from 'screens/Collection/utils';

const Sticker = (props: any) => {
  return (
    <View style={styles.stickerContainer}>
      <View style={styles.sticker}>
        {props.ad ? (
          <View style={styles.adContainer}>
            <Text>{props.ad?.title}</Text>
            <Text>{props.ad?.description}</Text>
            <Image
              source={{ uri: props.ad?.image }}
              style={{ width: 200, height: 300 }}
            />
            <Text>{props.ad?.link}</Text>
          </View>
        ) : (
          <View
            style={[
              styles.cardContainer,
              {
                backgroundColor: newShade(
                  props.countryData ? props.countryData.color : '#000',
                  180,
                ),
              },
            ]}
          >
            <Image
              source={{
                uri: props.swipeData?.flag,
              }}
              style={{ width: 200, height: 120 }}
            />
            <Text style={styles.stickerId}>
              {props.swipeData?.sticker?.name}
            </Text>
            <Text style={styles.stickerCountry}>
              {props.swipeData?.sticker?.category}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Sticker;
