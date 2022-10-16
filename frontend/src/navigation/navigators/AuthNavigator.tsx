import React from 'react';

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import TabBar from 'components/TabBar';
import * as Route from 'utils/route';
import tabScreens from 'navigation/screens/tabScreens';
import tabOptions from 'navigation/tabOptions';

const Tab = createBottomTabNavigator();

const AuthNavigator = () => (
  <Tab.Navigator
    initialRouteName={''}
    sceneContainerStyle={{ backgroundColor: 'transparent' }}
    tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
    screenOptions={() => tabOptions}
  >
    {tabScreens.map(({ name, component, options }) => (
      <Tab.Screen
        component={component}
        key={name}
        name={name}
        options={options}
      />
    ))}
  </Tab.Navigator>
);

export default AuthNavigator;
