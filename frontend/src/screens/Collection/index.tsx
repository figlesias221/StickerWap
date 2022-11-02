
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, View, Text, ScrollView, Modal, Pressable, Alert, Button } from 'react-native';

import spacingStyles from 'styles/spacing';
import api from 'utils/openUrl/api';
import styles from './styles';

const Collection = () => {
  const { t } = useTranslation();

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
            <View key={category}>
              <Text>{category}</Text>
              {(data[category] as any).map((sticker: any) => {
                const cant = userStickers[sticker.key];
                return (
                  <View key={sticker._id}>
                    <Text>{sticker.name}</Text>
                    <Text>{cant}</Text>
                    <Button
                      onPress={() => showAlert(sticker)}
                      title="+/-"
                      color="#009933"
                    />
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  function showAlert(sticker: any) {
    const cant = userStickers[sticker.key];
    Alert.alert(
      'Add/Remove ' + sticker._id + ' Stickers',
      'Now, you have ' + cant,
      cant > 0 ?
      [
        {
          text: 'Add One',
          onPress: () => addSticker(sticker.key),
          style: 'cancel',
        },
        {
          text: 'Remove One',
          onPress: () => removeSticker(sticker.key),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {},
          style: 'cancel'
        },
      ] : 
      [
        {
          text: 'Add One',
          onPress: () => addSticker(sticker.key),
          style: 'cancel',
        },
        {
          text: 'OK',
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
