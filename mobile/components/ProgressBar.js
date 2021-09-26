import * as React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { commonStyles } from '../config/styles';

export const ProgressBar = ({ currentQuestion }) => {
  const porcentage = String((currentQuestion / 8) * 100) + '%';

  return [
    <View style={styles.progressBar}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill, styles.progressFill, { width: porcentage }, commonStyles.shadow]}
      />
    </View>,
  ];
};

const styles = StyleSheet.create({
  progressBar: {
    flexGrow: 1,
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
  },

  progressFill: {
    borderRadius: 5,
    backgroundColor: '#2dc653',
  },
});
