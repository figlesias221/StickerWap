import Button from 'components/Button';
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
import { useSelector } from 'react-redux';
import { setUserData, signOut } from 'redux/slices/authSlice';
import { store } from 'redux/store';
import spacingStyles from 'styles/spacing';
import i18n from 'translations';
import api from 'utils/openUrl/api';
import { styles } from './styles';

const Settings = () => {
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const { dispatch } = store;

  const { data } = useSelector((state: RootState) => state.auth);

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

  console.log(data);

  useEffect(() => {
    getUserData();
  }, []);

  const [email, setEmail] = useState(data.email);
  const [name, setName] = useState(data.name);
  const [region, setRegion] = useState(data.region);
  const [error, setError] = useState('');

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

  const SignOut = () => {
    dispatch(signOut());
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
