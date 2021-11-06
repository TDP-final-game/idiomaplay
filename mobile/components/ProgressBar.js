import * as React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { commonStyles } from '../config/styles';
import { useState, useEffect } from 'react';

const TOTAL_TIME_IN_MILLISECONDS = 15 * 60 * 1000;

export const ProgressBar = ({ endTime }) => {
  const [percentagePassed, setPercentagePassed] = useState(calcPercentagePassed());

  function calcPercentagePassed() {
    var timeToEnd = endTime - Date.now(); //in ms
    const percentageCompleted =
      (TOTAL_TIME_IN_MILLISECONDS - timeToEnd) / TOTAL_TIME_IN_MILLISECONDS;
    return String(100 - percentageCompleted * 100) + '%';
  }

  useEffect(() => {
    let secTimer = setInterval(() => {
      setPercentagePassed(calcPercentagePassed());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  // const porcentage = String((currentQuestion / 8) * 100) + '%';

  return (
    <View style={styles.progressBar}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.progressFill,
          commonStyles.shadow,
          { width: percentagePassed },
        ]}
      />
    </View>
  );
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
