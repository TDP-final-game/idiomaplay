import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../config/colors';
import { LessonCard } from '../components/LessonCard';
import { UnitHeader } from '../components/ChapterHeader';
import UnitService from '../services/unitService';

const LessonsList = ({ navigation }) => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    UnitService.getLessons(1, '6171ef7fe77f0aeb8e6d6bc5').then(setLessons) // todo: spinner while loading
  }, []);

  const handleReturn = () => {
    return navigation.navigate('Home');
  };

  const handlePress = async (lessonOrderNumber) => {
    const exercisesAttempts = await UnitService.attemptLesson(1, lessonOrderNumber, '6174569bd026c7177f9fe5aa');
    return navigation.navigate('Excercise', {lessonOrderNumber, exercisesAttempts});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.12 }}>
        <UnitHeader returnButtonFunction={handleReturn} unit={1} />
      </View>

      <View style={{ flex: 0.88 }}>
        <FlatList
          data={lessons}
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
