import React, { useCallback, useState } from 'react';
import { Actionsheet, Box, FormControl, Stack, Text, TextArea } from 'native-base';
import { FormikErrors } from 'formik';
import FormInput from '@components/FormInput/FormInput';
import FormDateInput from '@components/FormDateInput';
import { SeverityEnum, SymptomsType } from '@customTypes/types';
import { colors } from '@theme';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Platform } from 'react-native';

interface SymptomFormPropType {
  values: SymptomsType;
  setFieldValue: (field: string, value: string) => void;
  errors: FormikErrors<SymptomsType>;
  handleChange: (text: string) => void;
  isFormEnabled?: boolean;
}

export default function SymptomForm({
  values,
  handleChange,
  setFieldValue,
  errors,
  isFormEnabled = true,
}: SymptomFormPropType) {
  const [showActionSheet, setShowActionSheet] = useState<boolean>(false);

  const setSeverity = useCallback((value: SeverityEnum) => {
    setFieldValue('severity', value);
    setShowActionSheet(false);
  }, []);

  return (
    <Box w="100%" flex={1} backgroundColor="white">
      <FormInput
        value={values.name}
        onChangeText={value => setFieldValue('name', value)}
        autoCapitalize="none"
        autoCorrect={false}
        label="Name"
        placeholder="Headache"
        error={errors.name}
        isReadOnly={!isFormEnabled}
      />
      <FormDateInput
        value={values.date}
        onChange={value => setFieldValue('date', value)}
        placeholder="10.01.2023"
        label="Date"
        error={errors.date}
        isEnabled={isFormEnabled}
      />

      <TouchableWithoutFeedback onPressIn={() => (isFormEnabled ? setShowActionSheet(true) : null)}>
        <FormInput
          value={values.severity ?? ''}
          placeholder="Select"
          label="Severity"
          isReadOnly
          autoCapitalize="words"
          error={errors.severity}
        />
      </TouchableWithoutFeedback>
      <FormControl>
        <Stack mx="4">
          <FormControl.Label>Description</FormControl.Label>
          <TextArea
            value={values.details}
            onChangeText={value => setFieldValue('details', value)}
            autoCompleteType="none"
            size="lg"
            minHeight={Platform.OS === 'ios' ? 150 : '0'}
            placeholder="Please describe your symptom..."
            autoCorrect={false}
            autoCapitalize="none"
            focusOutlineColor={colors.red}
            isReadOnly={!isFormEnabled}
          />
        </Stack>
      </FormControl>
      <Actionsheet isOpen={showActionSheet} onClose={() => setShowActionSheet(false)}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: 'sds.300',
              }}>
              Severity
            </Text>
          </Box>
          <Actionsheet.Item onPress={() => setSeverity(SeverityEnum.mild)}>Mild</Actionsheet.Item>
          <Actionsheet.Item onPress={() => setSeverity(SeverityEnum.moderate)}>
            Moderate
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => setSeverity(SeverityEnum.severe)}>
            Severe
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => setSeverity(SeverityEnum.critical)}>
            Critical
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
}
