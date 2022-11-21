import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  ScrollView,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import api from 'utils/openUrl/api';
import Button from 'components/Button';
import i18n from 'translations';
import { store } from 'redux/store';
import { loginSuccess } from 'redux/slices/authSlice';
import spacingStyles from 'styles/spacing';
import { styles } from './styles';
import { Dropdown } from 'react-native-element-dropdown';

const SignUp = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [regions, setRegions] = useState([]);
  const [error, setError] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const { dispatch } = store;

  const getRegions = () =>
    api.get('/regions').then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }
      return data;
    });

  useEffect(() => {
    getRegions().then((data: any) => {
      const regions = data.data.map((region: any) => {
        return { label: region, value: region };
      });

      setRegions(regions);
    });
  }, []);

  const singup = () =>
    api
      .post('/users/signup', {
        name,
        email,
        password,
        region,
      })
      .then((data: any) => {
        if (data?.response?.status === 400) {
          throw data?.response?.data?.error;
        }
        return data;
      });

  const handleSignUp = async () => {
    if (!name || !email || !password || !region) {
      setError('Todos los campos son obligatorios');
      return;
    }
    try {
      const { data } = await singup();
      AsyncStorage.setItem('token', data.token);
      AsyncStorage.setItem('id', data.id);
      dispatch(
        loginSuccess({
          accessToken: data.token,
        }),
      );
    } catch (error: any) {
      setError(error?.response?.data.error);
    }
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
      label: 'password',
      value: password,
      onChange: setPassword,
      placeholder: 'passwordPlaceholder',
    },
    {
      label: 'region',
      value: region,
      onChange: setRegion,
      placeholder: 'regionPlaceholder',
    },
  ];

  return (
    <SafeAreaView style={spacingStyles.mainScreen}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>{i18n.t('signup.title')}</Text>

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
                    data={regions}
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
            <Button label={i18n.t('signup.submit')} onPress={handleSignUp} />
          </View>
          {!!error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
