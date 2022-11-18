import React from 'react';
import { Pressable, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

interface Props {
  label: string;
  onPress?: (() => void) | null;
  primary?: boolean;
}

const Button = ({ label, onPress = null }: Props) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      { opacity: pressed ? 0.5 : 1.0 },
      styles.container,
    ]}
  >
    <LinearGradient
      colors={['#58DBDB', '#58DB72']}
      style={styles.linearGradient}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </LinearGradient>
  </Pressable>
);

export default Button;
