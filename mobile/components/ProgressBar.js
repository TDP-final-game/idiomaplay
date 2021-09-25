import * as React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const ProgressBar = ({ currentQuestion }) => {
  const porcentage = String((currentQuestion / 8) * 100) + '%';
  return [
    <View style={styles.progressBar}>
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.progressFill, { width: porcentage }]}
      />
    </View>,
  ];
};

const styles = StyleSheet.create({
  progressBar: {
    flexGrow: 1,
    borderColor: 'black',
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
  },

  progressFill: {
    borderRadius: 5,
    backgroundColor: '#2dc653',
  },
});
