import React from 'react';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, View } from 'react-native';

import tabScreens, { ITabScreens } from 'navigation/screens/tabScreens';
import shouldResetTabNavigator from 'utils/shouldResetTabNavigator';
import TabBarIcon from 'components/TabBarIcon';
import styles from './styles';

const TabBar = ({ state, navigation: { navigate } }: BottomTabBarProps) => {
  const { index: activeIndex } = state;

  const onPress = (tab: ITabScreens, index: number) =>
    navigate(
      tab.name,
      shouldResetTabNavigator(index, activeIndex)
        ? { screen: tab.default }
        : {},
    );

  return (
    <View style={styles.container}>
      {tabScreens.map((tab, index) => (
        <Pressable key={tab.name} onPress={() => onPress(tab, index)}>
          <TabBarIcon isActive={index === activeIndex} tab={tab} />
        </Pressable>
      ))}
    </View>
  );
};

export default TabBar;
