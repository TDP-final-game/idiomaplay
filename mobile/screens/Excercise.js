import * as React from 'react';
import { colors } from '../config/colors';
import { View, Text, StyleSheet } from 'react-native';
import { AnswerButton } from '../components/AnswerButton';
import { ChapterHeader } from '../components/ChapterHeader';
import { ChapterFooter } from '../components/ChapterFooter';
import { SafeAreaView } from 'react-native-safe-area-context';
import { exerciseTypes } from '../config/exercisesTypes';

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

const Excercise = ({ navigation, route }) => {
  const { unit, lesson, options, type, statement } = route.params;

  const explanationByType = {
    [exerciseTypes.COMPLETE_SENTENCE]: 'Completa la siguiente frase',
    [exerciseTypes.TRANSLATE_TO_NATIVE]: 'Traduzca la siguiente frase',
    [exerciseTypes.TRANSLATE_TO_FOREIGN]: 'Traduzca la siguiente frase',
  };

  const renderButtons = () => {
    const buttons = [];

    options.forEach((option, i) => {
      buttons.push(
        <View style={styles.buttonContainer} key={i}>
          <AnswerButton text={option} />
        </View>
      );
    });

    return buttons;
  };

  const returnHome = () => {
    return navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.12 }}>
        <ChapterHeader returnButtonFunction={returnHome} unit={unit} lesson={lesson} />
      </View>

      <View style={{ marginLeft: '2%' }}>
        <Text>{explanationByType[type]}</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{statement}</Text>
      </View>

      <View style={{ marginLeft: '2%' }}>
        <Text>Seleccione la opción correcta:</Text>
      </View>

      {renderButtons()}

      <View style={{ flex: 0.12 }}>
        <ChapterFooter questionResults={questionResults} />
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
