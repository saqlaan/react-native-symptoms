import { ArrowBackIcon, Box, Heading } from 'native-base';
import React from 'react';
import { IHeader } from './Header.type';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Header({ title, onPressBack }: IHeader) {
  return (
    <Box px="5" py="5" flexDirection="row" alignItems="center">
      {onPressBack && (
        <TouchableOpacity onPress={onPressBack}>
          <ArrowBackIcon mr="3" size="md" color="darkText" />
        </TouchableOpacity>
      )}
      <Heading>{title}</Heading>
    </Box>
  );
}
