import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../config/colors';
import { AnswerButton } from '../components/AnswerButton';
import { exerciseTypes } from '../config/exercisesTypes';
import { ChapterHeader } from '../components/ChapterHeader';
import { ChapterFooter } from '../components/ChapterFooter';
import { answerExercise } from '../redux/challenge'
import { getNextExercise } from '../services/exerciseServices';

const questionResults = [
  'correct',
  'incorrect',
  'incorrect',
  'correct',
  'correct',
  'current',
  null,
  null,
];

// const excercise = {
//   unit = 1,
//   lesson = 1,
//   options = [],
//   type = 'type',
//   statement = ''
// }

const excercise = {
  id: 0,
  unit: 0,
  lesson: 0,
  options: [],
  statement: '',
  type: exerciseTypes.COMPLETE_SENTENCE,
};

const Excercise = ({navigation, route}) => {
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(excercise);
  const dispatch = useDispatch();

  const explanationByType = {
    [exerciseTypes.COMPLETE_SENTENCE]: 'Completa la siguiente frase',
    [exerciseTypes.TRANSLATE_TO_NATIVE]: 'Traduzca la siguiente frase',
    [exerciseTypes.TRANSLATE_TO_FOREIGN]: 'Traduzca la siguiente frase',
  };

  useEffect(() => {
    loadExercise();
  }, []);

  const loadExercise = () => {
    getNextExercise().then(setCurrentExercise);
  };

  const onAnswerSelected = async (option) => {
    const {payload} = await dispatch(answerExercise([option, currentExercise.id]))
    setCorrectAnswer(payload)
  };

  const renderButtons = () =>
    currentExercise.options.map((option, i) =>
      <View style={styles.buttonContainer} key={i}>
        <AnswerButton
          answer={option}
          onPress={() => onAnswerSelected(option)}
          correctAnswer={correctAnswer}
        />
      </View>
    );

  const returnHome = () => {
    return navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 0.12}}>
        <ChapterHeader
          returnButtonFunction={returnHome}
          unit={currentExercise.unit}
          lesson={currentExercise.lesson}
        />
      </View>

      <View style={{marginLeft: '2%'}}>
        <Text>{explanationByType[currentExercise.type]}</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentExercise.statement}</Text>
      </View>

      <View style={{marginLeft: '2%'}}>
        <Text>Seleccione la opción correcta:</Text>
      </View>

      {renderButtons()}

      <View style={{flex: 0.12}}>
        <ChapterFooter
          questionResults={questionResults}
          correctAnswer={correctAnswer}
          onContinuePress={loadExercise}
        />
      </View>
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
    borderColor: '#bcbcbc',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
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

export default Excercise;
