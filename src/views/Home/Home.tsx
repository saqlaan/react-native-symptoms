import { StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import { Box, View } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import EmptyListComponent from './EmptyList';
import ListItem from './ListItem';
import Button from '@components/Button';
import Header from '@components/Header';
import { SymptomsType } from '@customTypes/types';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { useSymptomsReducer } from '@modules/symptoms.module';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@navigator/Navigator';

export default function Home() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { list } = useSymptomsReducer();

  const _renderItem = useCallback(({ item }: { item: SymptomsType; index: number }) => {
    return (
      <ListItem
        name={item.name}
        severity={item.severity}
        date={new Date(item.date).toLocaleDateString('de-DE')}
        details={item.details}
        id={item.id}
      />
    );
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Symptoms" />
      <FlatList
        keyExtractor={item => item.id ?? Date.now().toString()}
        style={styles.flatList}
        contentContainerStyle={styles.flatlistContainer}
        data={list}
        renderItem={_renderItem}
        ItemSeparatorComponent={() => <Box my={3} />}
        ListEmptyComponent={EmptyListComponent}
      />
      <Box px="2.5" pb="2.5">
        <Button
          title={list.length == 0 ? 'Start adding' : 'Add more'}
          onPress={() => navigation.navigate('Entry')}
        />
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flatList: {
    flex: 1,
    paddingTop: 20,
  },
  flatlistContainer: {
    flexGrow: 1,
  },
});
