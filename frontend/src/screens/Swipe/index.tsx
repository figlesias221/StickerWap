import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import i18n from 'translations';
import spacingStyles from 'styles/spacing';
import { Cross, Tick } from 'assets';
import api from 'utils/openUrl/api';
import { cateogryMap, newShade } from 'screens/Collection/utils';
import socket from 'utils/socket';
import { useSelector } from 'react-redux';

const Swipe = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [swipeData, setSwipeData] = useState<any>();
  const [ad, setAd] = useState<any>();
  const [countryData, setCountryData] = useState<any>();
  const { id } = useSelector((state: RootState) => state.auth.data);

  const handleChat = (user1: string, user2: string) => {
    socket.emit('createChat', user1, user2);
  };

  const handleSwipeSuccess = () => {
    if (ad) {
      getStickerData();
    } else {
      handleChat(swipeData.user_id, id);
      getStickerData();
    }
  };

  const handlePressCross = () => {
    getStickerData();
  };

  const getStickerData = () =>
    api.get('/swipe').then(async (data: any) => {
      if (data?.response?.status === 400) {
        setAd(null);
        setSwipeData(null);
        throw data?.response?.data?.error;
      }
      console.log(data.data);
      if (data.data.ad) {
        setAd(data.data.ad);
      } else {
        setSwipeData(data.data);
        setCountryData(cateogryMap(data.data.sticker.category));
        setAd(data.data.ad);
      }
    });

  useEffect(() => {
    getStickerData();
  }, []);

  return (
    <SafeAreaView style={spacingStyles.mainScreen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <LinearGradient
            colors={['#04B600', '#0094FF']}
            style={styles.linearGradient}
          >
            <Text style={styles.bigHeader}>{i18n.t('swipe.title')}</Text>
          </LinearGradient>
          <View style={styles.stickerContainer}>
            <View style={styles.sticker}>
              {ad ? (
                <View style={styles.adContainer}>
                  <Text>{ad?.title}</Text>
                  <Text>{ad?.description}</Text>
                  <Image
                    source={{ uri: ad?.image }}
                    style={{ width: 200, height: 300 }}
                  />
                  <Text>{ad?.link}</Text>
                </View>
              ) : swipeData ? (
                <View
                  style={[
                    styles.cardContainer,
                    {
                      backgroundColor: newShade(
                        countryData ? countryData.color : '#000',
                        180,
                      ),
                    },
                  ]}
                >
                  <Text style={styles.stickerText}>
                    {countryData?.abreviation}
                  </Text>
                  <Image
                    source={{
                      uri: swipeData?.flag,
                    }}
                    style={{ width: 100, height: 60 }}
                  />
                  <Text style={styles.stickerText}>
                    {swipeData?.sticker?.name}
                  </Text>
                  <Text style={styles.stickerText}>
                    {swipeData?.sticker?.category}
                  </Text>
                </View>
              ) : (
                <View style={styles.cardContainer}>
                  <Text style={styles.stickerText}>No more stickers</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonGreen}
              onPress={handlePressCross}
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

            <TouchableOpacity
              style={styles.buttonRed}
              onPress={handleSwipeSuccess}
            >
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Swipe;
