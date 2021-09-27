import * as React from 'react';
import { colors } from '../config/colors';
import { constants } from '../config/constants';
import { View, Text, StyleSheet } from 'react-native';
import { AnswerButton } from '../components/AnswerButton';
import { ChapterHeader } from '../components/ChapterHeader';
import { ChapterFooter } from '../components/ChapterFooter';
import { ProgressBar } from '../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const Excercise = ({ navigation }) => {
  const renderButtons = () => {
    const buttons = [];
    for (let i = 0; i < constants.TOTAL_OPTIONS; ++i) {
      buttons.push(
        <View style={styles.buttonContainer} key={i}>
          <AnswerButton text={opciones[i]} />
        </View>
      );
    }
    return buttons;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.12 }}>
        <ChapterHeader returnButtonFunction={() => navigation.navigate('Home')} />
      </View>

      <View style={{ flex: 0.02, paddingHorizontal: '2%' }}>
        <ProgressBar currentQuestion={5} />
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
  },
});

export default Excercise;