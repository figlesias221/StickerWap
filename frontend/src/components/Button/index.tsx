import React from 'react';
import { Pressable, Text } from 'react-native';
import { primary as primaryColor, secondary } from 'styles/theme';
import { buttonText } from 'styles/typography';
import styles from './styles';

interface Props {
  label: string;
  onPress?: (() => void) | null;
  primary?: boolean;
}

const Button = ({ label, onPress = null, primary }: Props) => (
  <Pressable
    style={[
      styles.container,
      { backgroundColor: primary ? primaryColor : secondary },
    ]}
    onPress={onPress}
  >
    <Text style={buttonText}>{label}</Text>
  </Pressable>
);

export default Button;
