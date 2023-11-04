import React from 'react';
import { FormControl, IInputProps, Input, Stack, WarningOutlineIcon } from 'native-base';
import { IFormInput } from './FormInput.type';
import { colors } from '@theme';

export default function FormInput({
  label,
  value,
  error,
  disabled,
  helperText,
  placeholder,
  isReadOnly = false,
  onPressIn,
  ...rest
}: IFormInput & IInputProps) {
  return (
    <FormControl colorScheme="darkBlue" isDisabled={disabled} isInvalid={!!error}>
      <Stack mx="4">
        <FormControl.Label>{label}</FormControl.Label>
        <Input
          isReadOnly={isReadOnly}
          size="lg"
          type="text"
          placeholder={placeholder}
          onPressIn={onPressIn}
          value={value}
          {...rest}
          focusOutlineColor={colors.red}
        />
        <FormControl.HelperText>{helperText}</FormControl.HelperText>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error}
        </FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  );
}
