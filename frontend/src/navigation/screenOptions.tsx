import React from 'react';

import { StackNavigationOptions } from '@react-navigation/stack';
import { Image, Platform, View } from 'react-native';
import { BackArrow } from 'assets';
import { primary } from 'styles/theme';

const screenOptions: StackNavigationOptions = {
  headerStyle: {
    shadowColor: 'transparent',
    height: 60,
  },
  headerMode: 'screen',
  headerBackTitleVisible: false,
  headerTitle: '',
  headerTransparent: true,
  headerBackImage: () => (
    <View style={{ marginTop: Platform.OS === 'ios' ? 45 : undefined }}>
      <Image
        resizeMode="contain"
        resizeMethod="resize"
        source={BackArrow}
        style={{
          alignSelf: 'center',
          height: 15,
          width: 50,
          tintColor: primary,
        }}
      />
    </View>
  ),
};

export default screenOptions;
