import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import i18n from 'translations';
import spacingStyles from 'styles/spacing';
import { Cross, Tick } from 'assets';
import api from 'utils/openUrl/api';
import { cateogryMap, newShade } from 'screens/Collection/utils';
import socket from 'utils/socket';
import Sticker from 'screens/Swipe/Sticker';

const Swipe = () => {
  const [swipeData, setSwipeData] = useState<any>();
  const [ad, setAd] = useState<any>();
  const [countryData, setCountryData] = useState<any>();
  const { id } = useSelector((state: RootState) => state.auth.data);

  const handleChat = (user1: string, user2: string) => {
    socket.emit('createChat', user1, user2);
  };

  const handleSwipeTick = async () => {
    if (ad) {
      const supported = await Linking.canOpenURL(ad?.link);
      if (supported) {
        await Linking.openURL(ad?.link);
      }
    } else {
      handleChat(swipeData.user_id, id);
    }

    try {
      getStickerData();
    } catch (error) {}
    setTimeout(() => {}, 1000);
  };

  const handleSwipeCross = () => {
    try {
      getStickerData();
    } catch (error) {}
  };

  const getStickerData = () =>
    api
      .get('/swipe')
      .then(async (data: any) => {
        if (data?.response?.status === 400) {
          setAd(null);
          setSwipeData(null);
        }

        if (data.data.ad) {
          setAd(data.data.ad);
        } else {
          setTimeout(() => {
            setSwipeData(data.data);
            setCountryData(cateogryMap(data.data.sticker.category));
            setAd(data.data.ad);
          }, 700);
        }
      })
      .catch(error => {});

  useEffect(() => {
    getStickerData();
  }, []);

  return (
    <SafeAreaView style={spacingStyles.mainScreen}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#04B600', '#0094FF']}
          style={styles.linearGradient}
        >
          <Text style={styles.bigHeader}>{i18n.t('swipe.title')}</Text>
        </LinearGradient>

        <Sticker ad={ad} swipeData={swipeData} countryData={countryData} />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.buttonGreen}
            onPress={handleSwipeCross}
          >
            <LinearGradient
              colors={['#FF8A00', '#E12900']}
              style={styles.linearGradientButton}
            >
              <Image
                source={Cross}
                style={{ tintColor: 'white', width: 20, height: 20 }}
              />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRed} onPress={handleSwipeTick}>
            <LinearGradient
              colors={['#58DBDB', '#58DB72']}
              style={styles.linearGradientButton}
            >
              <Image
                source={Tick}
                style={{ tintColor: 'white', width: 25, height: 25 }}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Swipe;
