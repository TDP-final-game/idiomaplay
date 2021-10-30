import * as React from 'react';
import { colors } from '../config/colors';
import { commonStyles } from '../config/styles';
import { TouchableOpacity } from 'react-native';
import { Text, StyleSheet } from 'react-native';

export const AnswerButton = ({ answer, onPress, correctAnswer, incorrectAnswer }) => {
  const getBackroundColor = () => {
    if (incorrectAnswer === answer) return colors.INCORRECT_COLOR;
    return answer === correctAnswer ? colors.CORRECT_COLOR : colors.SECONDARY;
  };

  return (
    <TouchableOpacity
      style={[styles.button, commonStyles.shadow, { backgroundColor: getBackroundColor() }]}
      onPress={onPress}
    >
      <Text style={{ fontSize: 15 }}>{answer}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    borderRadius: 8,
    // alignItems: 'center',
    textAlign: 'center',
    paddingLeft: '3%',
    marginHorizontal: '5%',
    justifyContent: 'center',
  },
});
