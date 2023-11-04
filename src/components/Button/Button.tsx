import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  ButtonProps,
  StyleSheet,
} from 'react-native';
import { IButton } from './Button.type';
import { colors } from '@theme';

export default function Button({
  title,
  titleStyle,
  image,
  style,
  activeOpacity,
  disabled,
  isLoading,
  loaderColor,
  imageStyle,
  ...rest
}: IButton & ButtonProps) {
  const opacityStyle = { opacity: disabled ? 0.6 : 1 };
  return (
    <TouchableOpacity
      style={[styles.container, opacityStyle, style]}
      activeOpacity={activeOpacity ?? 0.2}
      disabled={disabled ?? isLoading}
      {...rest}>
      {isLoading && <ActivityIndicator size="small" color={loaderColor} />}
      {!isLoading && image && <Image source={image} style={imageStyle} />}
      {!isLoading && title && <Text style={[styles.textStyle, titleStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red1,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
  },
});
