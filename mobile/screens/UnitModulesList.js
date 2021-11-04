import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../config/colors';
import { LessonCard } from '../components/LessonCard';
import { useDispatch, useSelector } from 'react-redux';
import UnitService from '../services/unitService';
import { initResults } from '../redux/lesson';
import { useIsFocused } from '@react-navigation/core';
import { screens } from '../config/screens';

const UnitModulesList = ({ navigation, route }) => {
  const [lessonsAttempts, setLessonsAttempts] = useState([]);

  const isFocused = useIsFocused();
  const {unitOrderNumber, challengeAttemptId} = route.params;

  useEffect(() => {
    navigation.setOptions({
      unit: unitOrderNumber,
      returnButtonFunction: () => navigation.goBack(),
    });

    // todo: spinner while loading
    UnitService.getLessonsAttempts(challengeAttemptId, unitOrderNumber).then((data) => {
      setLessonsAttempts(data);
    });
  }, [isFocused]);

  const dispatch = useDispatch();

  const handlePress = async (lessonOrderNumber) => {
    const exercisesAttempts = await UnitService.attemptLesson(challengeAttemptId, unitOrderNumber, lessonOrderNumber);

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
              <LessonCard
                text={item.name}
                state={item.status}
                onPress={() => handlePress(item.orderNumber)}
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

export default UnitModulesList;
