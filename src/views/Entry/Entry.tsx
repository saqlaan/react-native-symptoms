import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Modal } from 'native-base';
import { useFormik } from 'formik';
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SymptomsType } from '@customTypes/types';
import Button from '@components/Button';
import { SymptomFormSchema } from '@schema/index';
import { useSymptomsReducer } from '@modules/symptoms.module';
import { useNavigation } from '@react-navigation/native';
import Header from '@components/Header';
import SymptomForm from './SymptomForm';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@navigator/Navigator';
import * as Crypto from 'expo-crypto';

export default function Entry() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { dispatch, add } = useSymptomsReducer();
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<boolean>(false);

  const initialValues: SymptomsType = {
    name: '',
    date: new Date().toDateString(),
    severity: undefined,
    details: '',
  };

  const {
    isValid,
    values,
    handleChange,
    setFieldValue,
    errors,
    handleSubmit,
    submitCount,
    isSubmitting,
  } = useFormik({
    initialValues,
    onSubmit: () => {
      if (isValid) {
        dispatch(add({ ...values, id: Crypto.randomUUID() }));
        setIsSuccessModalVisible(true);
      }
    },
    validationSchema: SymptomFormSchema,
  });

  const handleOnCompletion = () => {
    setIsSuccessModalVisible(false);
    navigation.navigate('Home');
  };

  return (
    <Box flex={1} backgroundColor="white">
      <Header title="Add new symptom" onPressBack={() => navigation.navigate('Home')} />
      <ScrollView style={styles.scrollView}>
        <SymptomForm
          values={values}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          errors={submitCount > 0 ? errors : {}}
        />
      </ScrollView>
      <Box px="2.5" pb="2.5">
        <Button
          title="Add"
          onPress={() => handleSubmit()}
          disabled={(submitCount > 0 && !isValid) || isSubmitting}
          isLoading={isSubmitting}
        />
      </Box>
      {isSuccessModalVisible && (
        <Modal isOpen>
          <Modal.Content backgroundColor="transparent" maxH="220">
            <Modal.Body>
              <Box height={200}>
                <LottieView
                  source={require('../../../assets/animations/done.json')}
                  autoPlay
                  loop={false}
                  onAnimationFinish={handleOnCompletion}
                />
              </Box>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
