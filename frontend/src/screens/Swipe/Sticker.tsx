import React from 'react';
import { View, Text, Image } from 'react-native';
import i18n from 'translations';

import styles from './styles';
import { newShade } from 'screens/Collection/utils';
import { Stadium, WC } from 'assets';

const Sticker = (props: any) => {
  const specialCondition =
    props.swipeData?.sticker?.category === 'StadiumsAndBall' ||
    props.swipeData?.sticker?.category === 'Museum' ||
    props.swipeData?.sticker?.category === 'Special';

  return (
    <View style={styles.stickerContainer}>
      <View style={styles.sticker}>
        {props.ad ? (
          <View style={styles.adContainer}>
            <Image
              source={{ uri: props.ad?.image }}
              style={{ width: 160, height: 240, borderRadius: 10 }}
            />
            <Text style={styles.stickerId}>{props.ad?.title}</Text>
            <Text style={styles.stickerCountry}>{props.ad?.description}</Text>
          </View>
        ) : props.swipeData ? (
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
            {!specialCondition ? (
              <Image
                source={{
                  uri: props.swipeData?.flag,
                }}
                style={{ width: 200, height: 120, borderRadius: 10 }}
              />
            ) : (
              <Image
                source={
                  props.swipeData?.sticker?.category === 'StadiumsAndBall'
                    ? Stadium
                    : props.swipeData?.sticker?.category === 'Special' ||
                      props.swipeData?.sticker?.category === 'Museum'
                    ? WC
                    : null
                }
                style={{ width: 200, height: 120, borderRadius: 10 }}
              />
            )}

            <Text style={styles.stickerId}>
              {props.swipeData?.sticker?.name}
            </Text>
            <Text style={styles.stickerCountry}>
              {props.swipeData?.sticker?.category}
            </Text>
          </View>
        ) : (
          <View style={styles.cardContainer}>
            <Text style={styles.stickerId}>{i18n.t('swipe.empty')}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Sticker;
