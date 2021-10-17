import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../config/colors';
import { LessonCard } from '../components/LessonCard';
import { UnitHeader } from '../components/ChapterHeader';

const LESSONS = 50;

const lessonArray = [
  { number: 1, state: 'inprogress' },
  { number: 2, state: 'pending' },
  { number: 3, state: 'completed' },
  { number: 4, state: 'failed' },
  { number: 5, state: 'pending' },
  { number: 6, state: 'completed' },
  { number: 7, state: 'completed' },
  { number: 8, state: 'completed' },
  { number: 9, state: 'completed' },
];

const LessonsList = ({ navigation }) => {
  const handleReturn = () => {
    return navigation.navigate('Home');
  };

  const handlePress = (lessonNumer) => {
    return navigation.navigate('Excercise');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.12 }}>
        <UnitHeader returnButtonFunction={handleReturn} unit={1} />
      </View>

      <View style={{ flex: 0.88 }}>
        <FlatList
          data={lessonArray}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: '2%' }}>
              <LessonCard
                text={`Lesson ${item.number}`}
                state={item.state}
                onPress={() => handlePress(item.number)}
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
