import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from 'hooks/redux';
import { Platform, StatusBar } from 'react-native';
import { UNAUTH_STACK } from 'utils/route';
import AuthNavigator from './navigators/AuthNavigator';
import UnauthNavigator from './navigators/UnauthNavigator';

const Stack = createStackNavigator();

const Navigation = () => {
  const { isLogged } = useAppSelector((state: RootState) => state.nav);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
      />
      {true ? (
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={UNAUTH_STACK}
        >
          <Stack.Screen name={UNAUTH_STACK} component={UnauthNavigator} />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
