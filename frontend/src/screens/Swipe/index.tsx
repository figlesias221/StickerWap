import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  ScrollView,
  Alert,
} from 'react-native';

import Button from 'components/Button';
import styles from './styles';

const Swipe = () => {
  const isDarkMode = useColorScheme() === 'dark';

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
              <Text style={styles.subtitle}>Button:</Text>
              <Button
                label="Test"
                onPress={() => Alert.alert('Button clicked!')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Swipe;
