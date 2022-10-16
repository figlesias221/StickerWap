import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, View, Text } from 'react-native';

import spacingStyles from 'styles/spacing';
import styles from './styles';

const Collection = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={spacingStyles.mainScreen}>
      <View style={styles.container}>
        <Text>{t('collection.title')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Collection;
