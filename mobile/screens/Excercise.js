import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../config/colors';
import { exerciseTypes } from '../config/exercisesTypes';
import { AnswerButton } from '../components/AnswerButton';
import { ChapterHeader } from '../components/ChapterHeader';
import { ChapterFooter } from '../components/ChapterFooter';
import { AudioExercise } from '../components/AudioExercise';
import LessonService from '../services/lessonService';
import { answer } from '../redux/lesson';
import { useIsFocused } from '@react-navigation/native';

const Exercise = ({ navigation, route }) => {
  const { lessonOrderNumber, exercisesAttempts, challengeAttemptId } = route.params;

  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [incorrectAnswer, setIncorrectAnswer] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(
    exercisesAttempts.indexOf(exercisesAttempts.find((attemp) => attemp.status === 'PENDING'))
  );

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const unitOrderNumber = 1;

  const explanationByType = {
    [exerciseTypes.COMPLETE_SENTENCE]: 'Completa la siguiente frase',
    [exerciseTypes.TRANSLATE_TO_NATIVE]: 'Traduzca la siguiente frase',
    [exerciseTypes.TRANSLATE_TO_FOREIGN]: 'Traduzca la siguiente frase',
    [exerciseTypes.LISTENING]: 'Escucha el siguiente audio',
  };

  useEffect(() => {
    navigation.setOptions({
      unit: unitOrderNumber,
      lesson: lessonOrderNumber,
      returnButtonFunction: () => navigation.goBack(),
    });

    handleContinue();
  }, [isFocused]);

  const handleContinue = () => {
    if (currentExerciseIndex >= exercisesAttempts.length) {
      setCurrentExerciseIndex(0);
      return navigation.navigate('ExamEntry', { lessonOrderNumber, challengeAttemptId });
    }
    setCurrentExercise(exercisesAttempts[currentExerciseIndex]);
    setCorrectAnswer(null);
    setIncorrectAnswer(null);
  };

  const handleAnswerSelected = async (selectedOption) => {
    const correctOption = currentExercise.options.find((option) => option.correct).text;

    const _ = await LessonService.answerExercise(challengeAttemptId, unitOrderNumber, lessonOrderNumber, currentExerciseIndex, selectedOption); //todo: retry if error
    dispatch(answer(selectedOption === correctOption));

    setCurrentExerciseIndex(currentExerciseIndex + 1);

    setCorrectAnswer(correctOption);
    if (correctOption !== selectedOption) {
      setIncorrectAnswer(selectedOption);
    }
  };

  const renderButtons = () =>
    currentExercise.options.map((option, i) => (
      <View style={styles.buttonContainer} key={i}>
        <AnswerButton
          answer={option.text}
          onPress={() => handleAnswerSelected(option.text)}
          correctAnswer={correctAnswer}
          incorrectAnswer={incorrectAnswer}
        />
      </View>
    ));

  const handleReturn = () => {
    return navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentExercise && (
        <>
          <View style={{ marginLeft: '2%' }}>
            <Text>{explanationByType[currentExercise.type]}</Text>
          </View>

          <View style={styles.questionContainer}>
            {currentExercise.type === exerciseTypes.LISTENING ? (
              <AudioExercise
                style={styles.questionText}
                sentence={currentExercise.statement}
              ></AudioExercise>
            ) : (
              <Text style={styles.questionText}>{currentExercise.statement}</Text>
            )}
          </View>

          <View style={{ marginLeft: '2%' }}>
            <Text>Seleccione la opción correcta:</Text>
          </View>

          {renderButtons()}

          <View style={{ flex: 0.12 }}>
            <ChapterFooter showContinue={Boolean(correctAnswer)} onContinue={handleContinue} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.BACKGROUND,
  },

  questionContainer: {
    flex: 0.15,
    backgroundColor: colors.LIGHT_GRAY,
    borderColor: colors.DARK_GRAY,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    flex: 0.07,
    justifyContent: 'center',
  },

  questionText: {
    fontSize: 18,
    marginHorizontal: '5%',
  },
});

export default Exercise;
