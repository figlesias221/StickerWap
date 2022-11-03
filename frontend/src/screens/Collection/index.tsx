
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, View, Text, ScrollView, Modal, Pressable, Alert, Button } from 'react-native';

import spacingStyles from 'styles/spacing';
import api from 'utils/openUrl/api';
import styles from './styles';
import i18n from 'translations';

const Collection = () => {

  const [data, setData] = useState([]);
  const [userStickers, setUserStickers] = useState([]);
  const [name, setName] = useState();

  const getCollection = () =>
    api.get('/stickers').then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }
      setUserStickers(data?.data?.album);
    });

  const getAlbum = async () =>
    await api.get('/albums').then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }
      setName(data.data.album.name);
      const list = data?.data?.album?.stickerList;
      const stickersByCategory: any = {};
      Object.keys(list).forEach(key => {
        const sticker = list[key];
        if (!stickersByCategory[sticker.category]) {
          stickersByCategory[sticker.category] = [];
        }
        stickersByCategory[sticker.category].push({ ...sticker, key });
      });
      setData(stickersByCategory);
    });

  useEffect(() => {
    getAlbum();
    getCollection();
  }, []);

  return (
    <SafeAreaView style={spacingStyles.mainScreen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Text>{name}</Text>
          {Object.keys(data).map((category: any) => (
            <View style={styles.categorySection} key={category}>
              <Text>{category}</Text>
              {(data[category] as any).map((sticker: any) => {
                return (
                  <View key={sticker._id}>
                    <Text>{sticker.name} - {userStickers[sticker.key]}</Text>
                    <Button
                      onPress={() => showAlert(sticker)}
                      title="+/-"
                      color="#009933"
                    />
                  </View>
                );
              })}
              <View style={styles.line}>
                <Text>pepe</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  function showAlert(sticker: any) {
    const cant = userStickers[sticker.key];
    Alert.alert(
      i18n.t('collection-alert.title') + sticker.name,
      i18n.t('collection-alert.subtitle') + cant,
      cant > 0 ?
      [
        {
          text: i18n.t('collection-alert.add'),
          onPress: () => addSticker(sticker.key),
          style: 'cancel',
        },
        {
          text: i18n.t('collection-alert.remove'),
          onPress: () => removeSticker(sticker.key),
          style: 'cancel',
        },
        {
          text: i18n.t('collection-alert.ok'),
          onPress: () => {},
          style: 'cancel'
        },
      ] : 
      [
        {
          text: i18n.t('collection-alert.add'),
          onPress: () => addSticker(sticker.key),
          style: 'cancel',
        },
        {
          text: i18n.t('collection-alert.ok'),
          onPress: () => {},
        },
      ]
    );
  }

  function addSticker(id: number) {
    api.post('/stickers/' + id).then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }
      getCollection();
    })
  }

  function removeSticker(id: number) {
    api.delete('/stickers/' + id).then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }
      getCollection();
    })
  }
};



export default Collection;
