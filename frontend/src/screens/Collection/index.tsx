import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import spacingStyles from 'styles/spacing';
import api from 'utils/openUrl/api';
import styles from './styles';
import i18n from 'translations';
import {
  setAlbum,
  setUserStickers as setUserStickersAction,
  addUserSticker,
  deleteUserSticker,
  AlbumType,
  Sticker,
} from 'redux/slices/collectionSlice';
import { cateogryMap, newShade } from './utils';

const Collection = () => {
  const { album, userStickers: stickers } = useSelector(
    (state: RootState) => state.collection,
  );

  const [data, setData] = useState<AlbumType[]>(album);
  const [userStickers, setUserStickers] = useState(stickers);
  const [items, setItems] = useState();
  const [name, setName] = useState();

  const handleSelect = (value: any) => {
    const country = album.filter(item => item.category === value);
    setData(country.length === 0 ? album : country);
  };

  const Dropdown = (items: any) => {
    return (
      <RNPickerSelect
        style={{
          inputIOS: {
            color: 'black',
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 12,
            marginLeft: 10,
            width: '100%',
          },
        }}
        onValueChange={value => handleSelect(value)}
        items={items ? items : []}
        placeholder={{
          label: `${i18n.t('collection.filterPlaceholder')}`,
          value: null,
        }}
      />
    );
  };

  const dispatch = useDispatch();

  const getCollection = async () =>
    await api.get('/stickers').then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }
      dispatch(setUserStickersAction(data?.data?.album));
      setUserStickers(data?.data?.album);
    });

  const getAlbum = async () =>
    await api.get('/albums').then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }

      setName(data.data.album.name);
      const list = data?.data?.album?.stickerList;
      const stickersByCategory: AlbumType[] = [];

      Object.keys(list).forEach(key => {
        const sticker = list[key];
        sticker.key = key;
        const category = sticker.category;
        const categoryIndex = stickersByCategory.findIndex(
          item => item.category === category,
        );
        if (categoryIndex === -1) {
          stickersByCategory.push({
            category,
            stickers: [sticker],
          });
        } else {
          stickersByCategory[categoryIndex].stickers.push(sticker);
        }
      });

      setData(stickersByCategory);
      dispatch(setAlbum(stickersByCategory));

      const items: any = [];
      stickersByCategory.forEach(item => {
        items.push({
          label: item.category,
          value: item.category,
        });
      });
      setItems(items);
    });

  useEffect(() => {
    const controller = new AbortController();
    getAlbum();
    getCollection();
    return () => controller.abort();
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
          <View style={styles.filterContainer}>
            <View style={styles.filterSection}>
              <Text style={styles.filterText}>
                {i18n.t('collection.filter')}
              </Text>
              {Dropdown(items)}
            </View>
          </View>

          {data.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#04B600" />
            </View>
          ) : (
            data?.map((elem: AlbumType) => {
              const catInfo = cateogryMap(elem.category);
              return (
                <View style={styles.categorySection} key={elem.category}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={styles.categoryTitle}>
                      {!!catInfo.title ? catInfo.title : elem.category}
                    </Text>
                    <Text style={styles.categoryAbreviation}>
                      {catInfo.abreviation}
                    </Text>
                  </View>
                  <View style={styles.stickerContainer}>
                    {elem.stickers.map((sticker: Sticker) => {
                      let count = userStickers[sticker.key];
                      let width = count > 1 ? 1 : 0;
                      return (
                        <TouchableOpacity
                          onPress={() => showAlert(sticker)}
                          key={sticker._id}
                        >
                          <View
                            style={{
                              ...styles.sticker,
                              backgroundColor: newShade(
                                catInfo.color,
                                count > 0 ? 160 : 80,
                              ),
                              borderWidth: width,
                            }}
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
            })
          )}
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
    setUserStickers({ ...userStickers, [id]: userStickers[id] + 1 });
    dispatch(addUserSticker(id));
    api.post('/stickers/' + id).then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }
    });
  }

  function removeSticker(id: number) {
    setUserStickers({ ...userStickers, [id]: userStickers[id] - 1 });
    dispatch(deleteUserSticker(id));
    api.delete('/stickers/' + id).then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }
    });
  }
};

export default Collection;
