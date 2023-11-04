import React, { useCallback, useEffect } from 'react';
import { FormControl, Input, Stack, WarningOutlineIcon } from 'native-base';
import { IFormInput } from './FormDateInput.type';
import useCalendarBottomSheet from '../../hooks/useCalendarBottomSheet';
import { colors } from '@theme';

export default function FormDateInput({
  label,
  value,
  error,
  disabled,
  helperText,
  onChange,
  placeholder,
  isEnabled = true,
}: IFormInput) {
  const { showBottomSheet, value: selectedValue } = useCalendarBottomSheet();

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue]);

  const handleOnInputPressed = useCallback(() => {
    showBottomSheet();
  }, []);

  return (
    <FormControl isDisabled={disabled}>
      <Stack mx="4">
        <FormControl.Label>{label}</FormControl.Label>
        <Input
          isReadOnly
          size="lg"
          type="text"
          placeholder={placeholder}
          onPressIn={isEnabled ? () => handleOnInputPressed() : () => null}
          value={new Date(selectedValue).toLocaleDateString('de-DE')}
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
