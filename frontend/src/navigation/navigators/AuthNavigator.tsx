import React, { useEffect } from 'react';

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import TabBar from 'components/TabBar';
import tabScreens from 'navigation/screens/tabScreens';
import tabOptions from 'navigation/tabOptions';
import { COLLECTION } from 'utils/route';
import { setUserData } from 'redux/slices/authSlice';
import api from 'utils/openUrl/api';
import { useDispatch } from 'react-redux';

const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  const dispatch = useDispatch();
  const getUserData = () =>
    api.get('/users/me').then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }
      dispatch(setUserData(data.data));
    });

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={COLLECTION}
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
};

export default AuthNavigator;
