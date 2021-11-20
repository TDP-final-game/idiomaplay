import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../config/colors';
import { UnitCard } from '../components/UnitCard';
import ChallengeService from '../services/challengeService';
import api from '../services/api';
import { useIsFocused } from '@react-navigation/core';
import { screens } from '../config/screens';
import { states } from '../config/states';

const UnitsList = ({ navigation }) => {
  const [unitsAttempts, setUnitsAttempts] = useState([]);

  const isFocused = useIsFocused();
  const unitOrderNumber = 1; //todo: revisar

  useEffect(() => {
    navigation.setOptions({
      unit: unitOrderNumber,
      returnButtonFunction: () => navigation.goBack(),
      cartButtonFunction: () => navigation.navigate(screens.MARKET),
    });

    // todo: spinner while loading
    ChallengeService.getUnitsAttempts('challengeAttemptId').then((data) => {
      setUnitsAttempts(data);
    });
  }, [isFocused]);

  const handlePress = async (unitOrderNumber, status) => {
    if (status == states.notAvailable) return;

    let response = await api.get(`/users/me/challengeAttempts`);
    const challengeAttemptId = response.data[response.data.length - 1].id;

    await ChallengeService.attemptUnit(challengeAttemptId, unitOrderNumber);

    return navigation.navigate(screens.UNIT_MODULES_LIST, {
      unitOrderNumber,
      challengeAttemptId,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.88 }}>
        <FlatList
          data={unitsAttempts}
          keyExtractor={(item) => item.orderNumber.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: '2%' }}>
              <UnitCard
                text={item.name}
                state={item.status}
                onPress={() => handlePress(item.orderNumber, item.status)}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.BACKGROUND,
  },
});

export default UnitsList;
