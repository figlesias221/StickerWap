import React from 'react';
import { Image, Text, View } from 'react-native';

import { ITabScreens } from 'navigation/screens/tabScreens';
import styles from './styles';

interface ITabBarIcon {
  isActive: boolean;
  tab: ITabScreens;
}

const TabBarIcon = ({ isActive, tab }: ITabBarIcon) => (
  <View style={styles.container}>
    <Image
      style={[styles.icon, isActive ? styles.activeIcon : styles.inactiveIcon]}
      resizeMode="contain"
      source={tab.images.active}
    />
    <Text style={[isActive ? styles.textActive : styles.textInactive]}>
      {tab.title}
    </Text>
  </View>
);

export default TabBarIcon;
