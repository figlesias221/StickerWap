
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, Alert, Button } from 'react-native';

import spacingStyles from 'styles/spacing';
import api from 'utils/openUrl/api';
import styles from './styles';
import i18n from 'translations';
import LinearGradient from 'react-native-linear-gradient';

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
          <LinearGradient
            colors={['#04B600', '#0094FF']}
            style={styles.linearGradient}
          >
            <Text style={styles.bigHeader}>{i18n.t('collection.title')}</Text>
          </LinearGradient>
          {Object.keys(data).map((category: any) => (
            <View style={styles.categorySection} key={category}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <View style={styles.stickerContainer}>
                {(data[category] as any).map((sticker: any) => {
                  let count = userStickers[sticker.key]
                  return (
                    <View style={{ ...styles.sticker, backgroundColor: newShade(colorMap(category), count > 0 ? 180 : 80) }} key={sticker._id}>
                      <Text style={styles.stickerTitle}>{sticker.name}</Text>
                      <Text style={styles.stickerCount}>{userStickers[sticker.key]}</Text>
                      <Button
                        onPress={() => showAlert(sticker)}
                        title="+/-"
                        color="#000000"
                      />
                    </View>
                  );
                })}
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
            onPress: () => { },
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
            onPress: () => { },
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

const colorMap = (category: string) => {
  switch (category) {
    case "Qatar":
      return "#003366";
    case "Ecuador":
      return "#009933";
    case "Senegal":
      return "#FFCC00";
    case "Netherlands":
      return "#FF0000";
    case "England":
      return "#003366";
    case "Iran":
      return "#FFCC00";
    case "United States":
      return "#FF0000";
    case "Wales":
      return "#003366";
    case "Argentina":
      return "#009933";
    case "Saudi Arabia":
      return "#FFCC00";
    case "Mexico":
      return "#FF0000";
    case "Poland":
      return "#003366";
    case "France":
      return "#009933";
    case "Australia":
      return "#FFCC00";
    case "Denmark":
      return "#FF0000";
    case "Tunisia":
      return "#003366";
    case "Spain":
      return "#009933";
    case "Costa Rica":
      return "#FFCC00";
    case "Germany":
      return "#FF0000";
    case "Japan":
      return "#003366";
    case "Belgium":
      return "#009933";
    case "Canada":
      return "#FFCC00";
    case "Morocco":
      return "#FF0000";
    case "Croatia":
      return "#003366";
    case "Brazil":
      return "#009933";
    case "Serbia":
      return "#FFCC00";
    case "Switzerland":
      return "#FF0000";
    case "Cameroon":
      return "#003366";
    case "Portugal":
      return "#009933";
    case "Ghana":
      return "#FFCC00";
    case "Uruguay":
      return "#FF0000";
    case "South Korea":
      return "#003366";
    case "FWC":
      return "#ffd700";
    default:
      return "#009933";
  }
};

const newShade = (hexColor: string, magnitude: number) => {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
};

export default Collection;
