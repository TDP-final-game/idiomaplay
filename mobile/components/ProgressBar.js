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

const getColorFromPercentage = percentage => {
  percentage = Number(percentage.slice(0, -1));
  if(percentage > 80)
    return '#2dc653';
  else if(percentage > 50)
    return '#FF8000'
  else
    return '#FF0000';
}

const getStyles = timeConsumedPercentaje => StyleSheet.create({
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
