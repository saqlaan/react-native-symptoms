import { StyleSheet, ScrollView } from 'react-native';
import React, { useCallback } from 'react';
import { Box } from 'native-base';
import SymptomForm from '../Entry/SymptomForm';
import Button from '@components/Button';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Header from '@components/Header';
import { useSymptomsReducer } from '@modules/symptoms.module';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@navigator/Navigator';

export default function Detail() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { params } = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const { list, remove, dispatch } = useSymptomsReducer();
  const values = list.find(item => item.id === params?.symptomId);

  const handleDeleteItem = useCallback(() => {
    if (values?.id) {
      dispatch(remove({ id: values?.id }));
    }
  }, []);

  if (values?.id === undefined) {
    navigation.goBack();
    return;
  }

  return (
    <Box flex={1} backgroundColor="white">
      <Header title="Symptom Details" onPressBack={() => navigation.navigate('Home')} />
      <ScrollView style={styles.scrollView}>
        <SymptomForm
          values={values}
          handleChange={() => null}
          setFieldValue={() => null}
          errors={{}}
          isFormEnabled={false}
        />
      </ScrollView>
      <Box px="2.5" pb="2.5">
        <Button title="Delete" onPress={handleDeleteItem} />
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
