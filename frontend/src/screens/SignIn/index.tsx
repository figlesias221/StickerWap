import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  ScrollView,
  Alert,
  TextInput,
  Image,
} from 'react-native';

import Button from 'components/Button';
import i18n from 'translations';
import { styles, colors } from './styles';
import { store } from 'redux/store';
import { loginSuccess } from 'redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import { SIGNUP } from 'utils/route';
import { Logo } from 'assets';
import spacingStyles from 'styles/spacing';
import api from 'utils/openUrl/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = store;
  const { navigate } = useNavigation();

  const login = () =>
    api
      .post('/users/login', {
        email,
        password,
      })
      .then((data: any) => {
        if (data?.response?.status === 400) {
          throw data?.response?.data?.error;
        }
        return data;
      });

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    try {
      const { data } = await login();
      await AsyncStorage.setItem('token', data.token);
      dispatch(
        loginSuccess({
          accessToken: data.token,
        }),
      );
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <SafeAreaView style={spacingStyles.mainScreen}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.componentContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>{i18n.t('signin.stickerwap')}</Text>
            <Image source={Logo} style={styles.logo} />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.subtitle}>{i18n.t('signin.title')}</Text>

            <Text style={styles.label}>{i18n.t('signin.email')}:</Text>
            <TextInput
              style={styles.input}
              placeholder={i18n.t('signin.emailPlaceholder')}
              placeholderTextColor={colors.placeholder}
              onChangeText={text => setEmail(text)}
              value={email}
              autoCapitalize="none"
            />
            <Text style={styles.label}>{i18n.t('signin.password')}:</Text>
            <TextInput
              style={styles.input}
              placeholder={i18n.t('signin.passwordPlaceholder')}
              placeholderTextColor={colors.placeholder}
              onChangeText={text => setPassword(text)}
              value={password}
              autoCapitalize="none"
              secureTextEntry
            />

            <View style={styles.buttonContainer}>
              <Button label={i18n.t('signin.submit')} onPress={handleLogin} />
            </View>
            <View style={styles.createAccountContainer}>
              <Text style={styles.createLabel}>
                {i18n.t('signin.dontHaveAccount')}
              </Text>
              <Text
                style={styles.link}
                onPress={() => navigate(SIGNUP as never)}
              >
                {i18n.t('signin.signup')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
