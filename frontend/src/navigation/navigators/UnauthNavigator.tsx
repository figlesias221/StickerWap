import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import screenOptions from 'navigation/screenOptions';
import unauthScreens from 'navigation/screens/unauthScreens';
import { SIGNIN } from 'utils/route';

const Stack = createStackNavigator();

const UnauthNavigator = () => {
  // const { neverSignedIn } = useSelector((state: RootState) => state.appData);

  return (
    <Stack.Navigator initialRouteName={SIGNIN} screenOptions={screenOptions}>
      {unauthScreens.map(({ name, component }) => (
        <Stack.Screen name={name} component={component} key={name} />
      ))}
    </Stack.Navigator>
  );
};

export default UnauthNavigator;
