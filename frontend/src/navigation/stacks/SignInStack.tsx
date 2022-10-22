import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import screenOptions from 'navigation/screenOptions';
import { SIGN_IN } from 'utils/route';
import unauthScreens from 'navigation/screens/unauthScreens';

const Stack = createStackNavigator();

const SignInStack = () => (
  <Stack.Navigator initialRouteName={SIGN_IN}>
    {unauthScreens.map(({ name, component: Component }) => (
      <Stack.Screen
        name={name}
        key={name}
        // options={{
        //   ...screenOptions,
        //   ...(options || {}),
        // }}
      >
        {props => <Component {...props} />}
      </Stack.Screen>
    ))}
  </Stack.Navigator>  
);

export default SignInStack;
