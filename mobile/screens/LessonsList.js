import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../config/colors';
import { LessonCard } from '../components/LessonCard';
import { UnitHeader } from '../components/ChapterHeader';
import { useDispatch, useSelector } from 'react-redux';
import UnitService from '../services/unitService';
import { initResults } from '../redux/lesson';
import { useIsFocused } from '@react-navigation/core';

const LessonsList = ({ navigation }) => {
  const [lessonsAttempts, setLessonsAttempts] = useState([]);

  const userId = useSelector((state) => state.user.userId);

  const isFocused = useIsFocused();

  useEffect(() => {
    // todo: spinner while loading
    UnitService.getLessonsAttempts(userId, /*unit orden numer*/ 1).then(setLessonsAttempts);
  }, [isFocused]);

  const dispatch = useDispatch();

  const handleReturn = () => {
    return navigation.navigate('Home');
  };

  const handlePress = async (lessonOrderNumber) => {
    const exercisesAttempts = await UnitService.attemptLesson(
      userId,
      1,
      lessonOrderNumber,
      '617740f48d69dde4307a5281'
    );
    dispatch(initResults(exercisesAttempts));
    return navigation.navigate('Excercise', { lessonOrderNumber, exercisesAttempts });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.12 }}>
        <UnitHeader returnButtonFunction={handleReturn} unit={1} />
      </View>

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

export default LessonsList;
