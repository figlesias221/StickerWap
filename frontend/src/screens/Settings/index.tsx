import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, View, Text, Button } from 'react-native';
import { signOut } from 'redux/slices/authSlice';
import { store } from 'redux/store';
import spacingStyles from 'styles/spacing';
import styles from './styles';

const Settings = () => {
  const { t } = useTranslation();
  const { dispatch } = store;

  const SignOut = () => {
    dispatch(
      signOut()
    );
  };

  return (
    <SafeAreaView style={spacingStyles.mainScreen}>
      <View style={styles.container}>
        <Text>{t('settings.title')}</Text>
        <Button
          title={t('settings.logout')}
          onPress={() => SignOut()}
          />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
