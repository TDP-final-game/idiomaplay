import * as React from 'react';
import { colors } from '../config/colors';
import { commonStyles } from '../config/styles';
import { TouchableOpacity } from 'react-native';
import { Text, StyleSheet } from 'react-native';

export const AnswerButton = ({ answer, onPress, correctAnswer, incorrectAnswer, isExam }) => {
  const getBackroundColor = () => {
    if (incorrectAnswer === answer) return colors.INCORRECT_COLOR;
    return answer === correctAnswer ? colors.CORRECT_COLOR : (isExam? colors.PRIMARY : colors.SECONDARY);
  };

  return (
    <TouchableOpacity
      style={[getStyles(isExam).buttonContainer, commonStyles.shadow, { backgroundColor: getBackroundColor() }]}
      onPress={onPress}
    >
      <Text style={getStyles(isExam).button}>{answer}</Text>
    </TouchableOpacity>
  );
};

const getStyles = isExam => StyleSheet.create({
  buttonContainer: {
    flexGrow: 1,
    borderRadius: 8,
    // alignItems: 'center',
    textAlign: 'center',
    paddingLeft: '3%',
    marginHorizontal: '5%',
    justifyContent: 'center'
  },
  button: {
    fontSize: 15,
    textAlign: 'center',
    color: isExam ? colors.BACKGROUND : '#000000',
    fontWeight: 'bold',
  }
});
