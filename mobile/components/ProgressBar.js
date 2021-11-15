import * as React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { commonStyles } from '../config/styles';
import { useState, useEffect } from 'react';

export const ProgressBar = ({ endTime, onTimeFinishedCallback }) => {
  const TOTAL_TIME_IN_MILLISECONDS = 15 * 60 * 1000;
  const [percentagePassed, setPercentagePassed] = useState(`${calcPercentagePassed()}%`);

  function calcPercentagePassed() {
    let timeToEnd = endTime - Date.now(); //in ms
    const percentageCompleted =
      (TOTAL_TIME_IN_MILLISECONDS - timeToEnd) / TOTAL_TIME_IN_MILLISECONDS;
    let remainingPercentage = 100 - percentageCompleted * 100;
    return remainingPercentage > 0 ? remainingPercentage : 0;
  }

  useEffect(() => {
    let secTimer = setInterval(() => {
      const percentage = calcPercentagePassed();
      if (percentage <= 0) {
        onTimeFinishedCallback();
        setPercentagePassed('0%');
        return;
      }
      setPercentagePassed(`${percentage}%`);
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  return (
    <View style={getStyles(calcPercentagePassed()).progressBar}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          getStyles(calcPercentagePassed()).progressFill,
          commonStyles.shadow,
          { width: percentagePassed },
        ]}
      />
    </View>
  );
};

const getColorFromPercentage = (percentage) => {
  if (percentage > 80) return '#2dc653';
  else if (percentage > 50) return '#FF8000';
  else return '#FF0000';
};

const getStyles = (timeConsumedPercentaje) =>
  StyleSheet.create({
    progressBar: {
      //flexGrow: 1,
      borderWidth: 0,
      borderRadius: 5,
      height: '30%',
      marginHorizontal: '3%',
      marginTop: '2%',
      width: '85%',
      backgroundColor: 'lightgrey',
    },

    progressFill: {
      borderRadius: 5,
      backgroundColor: getColorFromPercentage(timeConsumedPercentaje),
    },
  });
