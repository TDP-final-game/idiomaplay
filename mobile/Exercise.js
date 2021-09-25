import * as React from 'react';
import { colors } from './config/colors';
import { View, Text, StyleSheet } from 'react-native';
import { AnswerButton } from './components/AnswerButton';
import { ChapterHeader } from './components/ChapterHeader';
import { ChapterFooter } from './components/ChapterFooter';
import { ProgressBar } from './components/ProgressBar';

const TOTAL_QUESTIONS = 8;
const TOTAL_OPTIONS = 6;

const opciones = [
  'Hoy es un buen día para salvar vidas',
  'Soy bueno salvando vidas',
  'Muchos dias no salvamos vidas',
  'Muchos dias no salvamos vidas',
  'Las vidas no son siempre salvables',
  'Ayer fue un gran dia para salvar vidas',
];

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

const Excercise = () => {
  const renderButtons = () => {
    const buttons = [];
    for (let i = 0; i < TOTAL_OPTIONS; ++i) {
      buttons.push(
        <View style={styles.buttonContainer}>
          <AnswerButton text={opciones[i]} key={i} />
        </View>
      );
    }
    return buttons;
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.12 }}>
        <ChapterHeader />
      </View>

      <View style={{ flex: 0.02, paddingHorizontal: '2%'}}>
        <ProgressBar currentQuestion={7}/>
      </View>


      <View style={{ marginLeft: '2%' }}>
        <Text>Traduzca la siguiente frase al español:</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>“Today It's a great day to save lives”</Text>
      </View>

      <View style={{ marginLeft: '2%' }}>
        <Text>Traduzca la siguiente frase al español:</Text>
      </View>

      {renderButtons()}

      <View style={{ flex: 0.12 }}>
        <ChapterFooter questionResults={questionResults} />
      </View>
    </View>
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
  },
});

export default Excercise;
