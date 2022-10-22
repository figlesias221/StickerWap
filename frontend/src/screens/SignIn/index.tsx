import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';

import Button from 'components/Button';
import i18n from 'translations';
import { styles, colors } from './styles';
import axios from 'axios';
import { store } from 'redux/store';
import { loginSuccess } from 'redux/slices/authSlice';

const SignIn = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { dispatch } = store;

  const SignInAttempt = () => {
    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          Alert.alert(data.error);
        }
        if (data.token) {
          Alert.alert('Success');
          dispatch(
            loginSuccess({
              accessToken: data.token
            }),
          );
        }
      })
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}
      >
        <View style={styles.backgroundStyle}>
          <View style={styles.sectionContainer}>
            <View style={styles.componentContainer}>
              <Text style={styles.subtitle}>{i18n.t('signin.title')}</Text>

              <Text style={styles.label}>{i18n.t('signin.email')}:</Text>
              <TextInput
                style={styles.input}
                placeholder={i18n.t('signin.emailPlaceholder')}
                placeholderTextColor={colors.placeholder}
                onChangeText={text => setEmail(text)}
                value={email}
              />
              <Text style={styles.label}>{i18n.t('signin.password')}:</Text>
              <TextInput
                style={styles.input}
                placeholder={i18n.t('signin.passwordPlaceholder')}
                placeholderTextColor={colors.placeholder}
                onChangeText={text => setPassword(text)}
                value={password}
              />
              <Text style={styles.label}>
                {i18n.t('signin.dontHaveAccount')}
                <Text style={styles.link}> {i18n.t('signin.signup')}</Text>
              </Text>
              <View style={styles.buttonContainer}>
                <Button
                  label={i18n.t('signin.submit')}
                  onPress={() => SignInAttempt()}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
