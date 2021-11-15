import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../config/colors';
import { exerciseTypes } from '../config/exercisesTypes';
import { AnswerButton } from '../components/AnswerButton';
import { ChapterFooter } from '../components/ChapterFooter';
import { AudioExercise } from '../components/AudioExercise';
import LessonService from '../services/lessonService';
import { answer } from '../redux/lesson';
import { ProgressBar } from '../components/ProgressBar';
import { useIsFocused } from '@react-navigation/native';
import ExamService from '../services/examService';

import { CustomAlert } from '../components/CustomAlert';

const Exercise = ({ navigation, route }) => {
  const { lessonOrderNumber, exercisesAttempts, challengeAttemptId, isExam } = route.params;

  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [incorrectAnswer, setIncorrectAnswer] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);

  const [showExitExamAlert, setShowExitExamAlert] = useState(false);
  const [showFinishedTimeAlert, setShowFinishedTimeAlert] = useState(false);

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

  const abortExam = () => {
    setShowExitExamAlert(false);
    ExamService.abort(challengeAttemptId, unitOrderNumber).then(() => navigation.goBack());
  };

  useEffect(() => {
    navigation.setOptions({
      unit: unitOrderNumber,
      lesson: lessonOrderNumber,
      returnButtonFunction: () => (isExam ? setShowExitExamAlert(true) : navigation.goBack()),
    });

    handleContinue();
  }, [isFocused]);

  const Alerts = () => (
    <>
      <CustomAlert
        visible={showFinishedTimeAlert}
        title={'Te quedaste sin tiempo!'}
        body={'Vuelve al menu principal para reintentar'}
        primaryButtonText={'Volver a la unidad'}
        onPrimaryButtonPress={() => {
          ExamService.abort(challengeAttemptId, unitOrderNumber).then(() => navigation.goBack());
        }}
      />
      <CustomAlert
        visible={showExitExamAlert}
        title={'Estas seguro que deseas salir?'}
        body={'Al salir del examen, este se desaprobará, desea continuar?'}
        primaryButtonText={'Salir'}
        onPrimaryButtonPress={abortExam}
        secondaryButtonText={'Volver al examen'}
        onSecondaryButtonPress={() => setShowExitExamAlert(false)}
      />
    </>
  );

  const handleContinue = async () => {
    if (currentExerciseIndex >= exercisesAttempts.length) {
      setCurrentExerciseIndex(0);
      // Ask if he pass and update values, with response set winning values

      const rewards = isExam
        ? await ExamService.getReward(challengeAttemptId, unitOrderNumber)
        : await LessonService.getReward(challengeAttemptId, unitOrderNumber, lessonOrderNumber);

      return navigation.navigate('ExamEntry', {
        unitOrderNumber,
        lessonOrderNumber,
        challengeAttemptId,
        rewards,
        isExam,
      });
    }
    setCurrentExercise(exercisesAttempts[currentExerciseIndex]);
    setCorrectAnswer(null);
    setIncorrectAnswer(null);
  };

  const handleAnswerSelected = async (selectedOption) => {
    const correctOption = currentExercise.options.find((option) => option.correct).text;

    if (isExam) {
      await ExamService.answerExercise(
        challengeAttemptId,
        unitOrderNumber,
        currentExerciseIndex,
        selectedOption
      );
    } else {
      await LessonService.answerExercise(
        challengeAttemptId,
        unitOrderNumber,
        lessonOrderNumber,
        currentExerciseIndex,
        selectedOption
      );
    }

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
          isExam={isExam}
        />
      </View>
    ));

  return (
    <SafeAreaView style={styles.container}>
      <Alerts />

      {currentExercise && (
        <>
          {isExam && (
            <View style={{ padding: '2%', flexDirection: 'row', justifyContent: 'center' }}>
              <AntDesign name="clockcircle" size={20} color={colors.PRIMARY_DARK} />
              <ProgressBar
                endTime={route.params.expirationDate}
                onTimeFinishedCallback={() => setShowFinishedTimeAlert(true)}
              />
            </View>
          )}

          <View style={{ marginLeft: '2%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              {explanationByType[currentExercise.type]}
            </Text>
          </View>

          <View style={styles.questionContainer}>
            {currentExercise.type === exerciseTypes.LISTENING ? (
              <AudioExercise style={styles.questionText} sentence={currentExercise.statement} />
            ) : (
              <Text style={styles.questionText}> "{currentExercise.statement}"</Text>
            )}
          </View>

          <View style={{ marginLeft: '5%' }}>
            <Text style={{ fontSize: 17 }}>Seleccione la opción correcta:</Text>
          </View>

          {renderButtons()}

          <View style={styles.footer}>
            <ChapterFooter
              showContinue={Boolean(correctAnswer)}
              onContinue={handleContinue}
              isExam={isExam}
            />
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
    fontStyle: 'italic',
    marginHorizontal: '5%',
  },
  footer: {
    flex: 0.12,
  },
});

export default Exercise;
