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
import { useNavigation } from '@react-navigation/native';
import { SIGNUP } from 'utils/route';

const SignUp = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [region, setRegion] = React.useState('');
  const { dispatch } = store;
  const { navigate } = useNavigation();

  const SignUpAttempt = () => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: username,
        region: region,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
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
      }
    )
  };

  const fields = [
    {
      label: 'username',
      value: username,
      onChange: setUsername,
      placeholder: 'usernamePlaceholder',
    },
    {
      label: 'email',
      value: email,
      onChange: setEmail,
      placeholder: 'emailPlaceholder'
    },
    {
      label: 'password',
      value: password,
      onChange: setPassword,
      placeholder: 'passwordPlaceholder'
    },
    {
      label: 'region',
      value: region,
      onChange: setRegion,
      placeholder: 'regionPlaceholder'
    },
  ]

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
              <Text style={styles.subtitle}>{i18n.t('signup.title')}</Text>

              {
                fields.map((field, index) => (
                  <View key={index}>
                    <Text style={styles.label}>{i18n.t('signup.'+field.label)}:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder={i18n.t('signup.'+field.placeholder)}
                      value={field.value}
                      onChangeText={field.onChange}
                    />  
                  </View>
                ))
              }

              <View style={styles.buttonContainer}>
                <Button
                  label={i18n.t('signup.submit')}
                  onPress={() => SignUpAttempt()}
                />
              </View>
              
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
