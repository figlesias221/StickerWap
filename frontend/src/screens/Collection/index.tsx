import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';

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
          {Object.keys(data).map((category: any) => {
            const catInfo = cateogryMap(category);
            return (
              <View style={styles.categorySection} key={category}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.categoryTitle}>{category}</Text>
                  <Text style={styles.categoryAbreviation}>
                    {catInfo.abreviation}
                  </Text>
                </View>
                <View style={styles.stickerContainer}>
                  {(data[category] as any).map((sticker: any) => {
                    let count = userStickers[sticker.key];
                    let width = count > 1 ? 1 : 0;
                    return (
                      <TouchableOpacity onPress={() => showAlert(sticker)}>
                        <View
                          style={{
                            ...styles.sticker,
                            backgroundColor: newShade(
                              catInfo.color,
                              count > 0 ? 160 : 80,
                            ),
                            borderWidth: width,
                          }}
                          key={sticker._id}
                        >
                          <Text style={styles.stickerTitle}>
                            {sticker.name.split('_')[1]}
                          </Text>
                          {count > 0 && (
                            <Text style={styles.stickerCount}>{count}</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  function showAlert(sticker: any) {
    const cant = userStickers[sticker.key];
    Alert.alert(
      i18n.t('collection-alert.title') + sticker.name,
      i18n.t('collection-alert.subtitle') + cant,
      cant > 0
        ? [
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
              style: 'cancel',
            },
          ]
        : [
            {
              text: i18n.t('collection-alert.add'),
              onPress: () => addSticker(sticker.key),
              style: 'cancel',
            },
            {
              text: i18n.t('collection-alert.ok'),
              onPress: () => {},
            },
          ],
    );
  }

  function addSticker(id: number) {
    api.post('/stickers/' + id).then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }
      getCollection();
    });
  }

  function removeSticker(id: number) {
    api.delete('/stickers/' + id).then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }
      getCollection();
    });
  }
};

const cateogryMap = (category: string) => {
  switch (category) {
    case 'Qatar':
      return {
        abreviation: 'QAT',
        color: '#003366',
      };
    case 'Ecuador':
      return {
        abreviation: 'ECU',
        color: '#009B3A',
      };
    case 'Senegal':
      return {
        abreviation: 'SEN',
        color: '#D21034',
      };
    case 'Netherlands':
      return {
        abreviation: 'NED',
        color: '#FDBB30',
      };
    case 'England':
      return {
        abreviation: 'ENG',
        color: '#FFFFFF',
      };
    case 'Iran':
      return {
        abreviation: 'IRN',
        color: '#FF0000',
      };
    case 'United States':
      return {
        abreviation: 'USA',
        color: '#FF0000',
      };
    case 'Wales':
      return {
        abreviation: 'WAL',
        color: '#FFFFFF',
      };
    case 'Argentina':
      return {
        abreviation: 'ARG',
        color: '#FFFFFF',
      };
    case 'Saudi Arabia':
      return {
        abreviation: 'KSA',
        color: '#FFFFFF',
      };
    case 'Mexico':
      return {
        abreviation: 'MEX',
        color: '#FFFFFF',
      };
    case 'Poland':
      return {
        abreviation: 'POL',
        color: '#FFFFFF',
      };
    case 'France':
      return {
        abreviation: 'FRA',
        color: '#FFFFFF',
      };
    case 'Australia':
      return {
        abreviation: 'AUS',
        color: '#FFFFFF',
      };
    case 'Denmark':
      return {
        abreviation: 'DEN',
        color: '#FFFFFF',
      };
    case 'Tunisia':
      return {
        abreviation: 'TUN',
        color: '#FFFFFF',
      };
    case 'Spain':
      return {
        abreviation: 'ESP',
        color: '#FFFFFF',
      };
    case 'Costa Rica':
      return {
        abreviation: 'CRC',
        color: '#FFFFFF',
      };
    case 'Germany':
      return {
        abreviation: 'GER',
        color: '#FFFFFF',
      };
    case 'Japan':
      return {
        abreviation: 'JPN',
        color: '#FFFFFF',
      };
    case 'Belgium':
      return {
        abreviation: 'BEL',
        color: '#FFFFFF',
      };
    case 'Canada':
      return {
        abreviation: 'CAN',
        color: '#FFFFFF',
      };
    case 'Morocco':
      return {
        abreviation: 'MAR',
        color: '#FFFFFF',
      };
    case 'Croatia':
      return {
        abreviation: 'CRO',
        color: '#FFFFFF',
      };
    case 'Brazil':
      return {
        abreviation: 'BRA',
        color: '#FFFFFF',
      };
    case 'Serbia':
      return {
        abreviation: 'SRB',
        color: '#FFFFFF',
      };
    case 'Switzerland':
      return {
        abreviation: 'SUI',
        color: '#FFFFFF',
      };
    case 'Cameroon':
      return {
        abreviation: 'CMR',
        color: '#FFFFFF',
      };
    case 'Portugal':
      return {
        abreviation: 'POR',
        color: '#FFFFFF',
      };
    case 'Ghana':
      return {
        abreviation: 'GHA',
        color: '#FFFFFF',
      };
    case 'Uruguay':
      return {
        abreviation: 'URU',
        color: '#FFFFFF',
      };
    case 'South Korea':
      return {
        abreviation: 'KOR',
        color: '#FFFFFF',
      };
    case 'FWC':
      return {
        abreviation: 'FWC',
        color: '#FFFFFF',
      };
    case 'STADIUM':
      return {
        abreviation: 'STADIUM',
        color: '#FFFFFF',
      };
    case 'MUSEUM':
      return {
        abreviation: 'STA',
        color: '#FFFFFF',
      };
    default:
      return {
        abreviation: 'QAT',
        color: '#003366',
      };
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
