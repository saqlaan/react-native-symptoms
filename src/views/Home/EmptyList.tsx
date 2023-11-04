import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Box, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@navigator/Navigator';

export default function EmptyListComponent() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Box mb="5">
        <Image
          source={require('@assets/images/medical-checkup.png')}
          style={styles.imageStyle}
          accessibilityLabel="A beautiful image"
        />
      </Box>
      <Text fontSize="lg">Get started by entering symptoms</Text>
      <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.navigate('Home')} />
    </Box>
  );
}

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: 10,
    flex: 1,
    marginBottom: 100,
  },
  container: {
    flexGrow: 1,
  },
  imageStyle: {
    objectFit: 'cover',
    width: 100,
    height: 100,
  },
});
