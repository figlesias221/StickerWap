import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, View, Text } from 'react-native';

import spacingStyles from 'styles/spacing';
import i18n from 'translations';
import styles from './styles';

const Chat = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={spacingStyles.mainScreen}>
      <View style={styles.container}>
        <Text style={styles.subtitle}>{i18n.t('chat.title')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
