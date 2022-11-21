import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  StatusBar,
  useColorScheme,
  Button as RNButton,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

import { setUserData, signOut } from 'redux/slices/authSlice';
import { store } from 'redux/store';
import spacingStyles from 'styles/spacing';
import i18n from 'translations';
import api from 'utils/openUrl/api';
import { styles } from './styles';
import Button from 'components/Button';
import { emptyAlbumState, setRegions } from 'redux/slices/collectionSlice';
import { Dropdown } from 'react-native-element-dropdown';

const Settings = () => {
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const { dispatch } = store;

  const { data } = useSelector((state: RootState) => state.auth);
  const { regions } = useSelector((state: RootState) => state.collection);
  const [regionList, setRegionsState] = useState(regions);
  const [isFocus, setIsFocus] = useState(false);
  const [email, setEmail] = useState(data?.email);
  const [name, setName] = useState(data?.name);
  const [region, setRegion] = useState(data?.region);
  const [error, setError] = useState('');

  const getUserData = () =>
    api.get('/users/me').then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }
      setName(data.data.name);
      setEmail(data.data.email);
      setRegion(data.data.region);
      dispatch(setUserData(data.data));
    });

  useEffect(() => {
    getUserData();
  }, []);

  const handleEdit = () => {
    api
      .put('/users/me', {
        name,
        email,
        region,
      })
      .then((data: any) => {
        if (data?.response?.status === 400) {
          setError(data?.response?.data?.error);
        }
        dispatch(setUserData(data.data));
        Alert.alert('Datos actualizados');
      });
  };

  const fields = [
    {
      label: 'name',
      value: name,
      onChange: setName,
      placeholder: 'namePlaceholder',
    },
    {
      label: 'email',
      value: email,
      onChange: setEmail,
      placeholder: 'emailPlaceholder',
    },
    {
      label: 'region',
      value: region,
      onChange: setRegion,
      placeholder: 'regionPlaceholder',
    },
  ];

  const getRegions = () =>
    api.get('/regions').then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }
      return data;
    });

  useEffect(() => {
    getRegions().then((data: any) => {
      const regions = data.data.map((region: any) => ({
        label: region,
        value: region,
      }));

      setRegionsState(regions);
      dispatch(setRegions(regions));
    });
  }, []);

  const SignOut = () => {
    dispatch(signOut());
    dispatch(emptyAlbumState());
  };

  return (
    <SafeAreaView style={spacingStyles.mainScreen}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>{i18n.t('settings.title')}</Text>

          {fields.map((field, index) => (
            <View key={index}>
              <Text style={styles.label}>
                {i18n.t('signup.' + field.label)}:
              </Text>
              {field.label !== 'region' ? (
                <TextInput
                  style={styles.input}
                  placeholder={i18n.t('signup.' + field.placeholder)}
                  value={field.value}
                  onChangeText={field.onChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoCompleteType="off"
                  secureTextEntry={field.label === 'password'}
                />
              ) : (
                <>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: 'blue' },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={regionList}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? i18n.t('signup.region') : ''}
                    searchPlaceholder="Search..."
                    value={region}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setRegion(item.value);
                      setIsFocus(false);
                    }}
                    renderRightIcon={() => (
                      <FontAwesome
                        name={isFocus ? 'chevron-up' : 'chevron-down'}
                        color={'#444'}
                        size={14}
                        style={{ marginRight: 10 }}
                      />
                    )}
                  />
                </>
              )}
            </View>
          ))}

          <View style={styles.buttonContainer}>
            <Button label={i18n.t('settings.edit')} onPress={handleEdit} />
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.signoutbuttonContainer}>
            <RNButton
              title={t('settings.logout')}
              onPress={() => SignOut()}
              color={'red'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
