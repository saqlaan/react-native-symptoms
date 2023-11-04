import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@theme';
import { SymptomsType } from '@customTypes/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@navigator/Navigator';

export default function ListItem({ name, details, severity, date, id }: SymptomsType) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleOnPress = useCallback(() => {
    navigation.navigate('Detail', {
      symptomId: id ?? '',
    });
  }, [navigation, id]);

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>
            {name} <Text style={styles.subTitle}>{severity}</Text>
          </Text>
          <View style={styles.date}>
            <Ionicons name="calendar-outline" size={14} color={colors.red} />
            <Text style={styles.dateText}>{date.toString()}</Text>
          </View>
        </View>
        <View>
          {details ? (
            <Text ellipsizeMode="tail" numberOfLines={2}>
              {details}
            </Text>
          ) : (
            <Text style={styles.noDetailText}>No details available</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 4,
    borderLeftColor: colors.red,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  date: {
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dateText: {
    fontSize: 12,
    marginLeft: 5,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 13,
    marginBottom: 5,
    fontWeight: '400',
  },
  noDetailText: {
    color: colors.gray,
  },
});
