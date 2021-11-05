import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../config/colors';
import { LessonCard } from '../components/LessonCard';
import { useDispatch } from 'react-redux';
import UnitService from '../services/unitService';
import { initResults } from '../redux/lesson';
import { useIsFocused } from '@react-navigation/core';
import { screens } from '../config/screens';
import { moduleTypes } from '../config/constants';
import { ExamCard } from '../components/ExamCard';

const UnitModulesList = ({ navigation, route }) => {
  const [lessonsAttempts, setLessonsAttempts] = useState([]);

  const isFocused = useIsFocused();
  const { unitOrderNumber, challengeAttemptId } = route.params;

  useEffect(() => {
    navigation.setOptions({
      unit: unitOrderNumber,
      returnButtonFunction: () => navigation.goBack(),
    });

    // todo: spinner while loading
    UnitService.getUnitModules(challengeAttemptId, unitOrderNumber).then(setLessonsAttempts);
  }, [isFocused]);

  const dispatch = useDispatch();

  const handlePress = async (lessonOrderNumber) => {
    const exercisesAttempts = await UnitService.attemptLesson(
      challengeAttemptId,
      unitOrderNumber,
      lessonOrderNumber
    );

    dispatch(initResults(exercisesAttempts));

    return navigation.navigate(screens.EXERCISE, {
      lessonOrderNumber,
      exercisesAttempts,
      challengeAttemptId,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.88 }}>
        <FlatList
          data={lessonsAttempts}
          keyExtractor={(item) => item.orderNumber.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: '2%' }}>
              {item.type === moduleTypes.LESSON ? (
                <LessonCard
                  text={item.name}
                  state={item.status}
                  disabled={item.blocked}
                  onPress={() => handlePress(item.orderNumber)}
                />
              ) : (
                <ExamCard
                  text={item.name}
                  state={item.status}
                  disabled={item.blocked}
                  onPress={() => handlePress(item.orderNumber)}
                />
              )}
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

export default UnitModulesList;
