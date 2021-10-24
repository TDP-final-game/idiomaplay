import * as React from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { commonStyles } from '../config/styles';
import { useState, useEffect } from 'react';
const MAX_TIME = 300;

export const ProgressBar = () => {
  const [percentagePassed, setPercentagePassed] = useState('0%');
  const initialTime = new Date();

  function getPercentagePassed() {
    var endTime = new Date();
    var timeDiff = endTime - initialTime; //in ms
    timeDiff /= 1000;

    var seconds = Math.round(timeDiff);
    const percentage = Math.min(100, (seconds * 100) / MAX_TIME);

    return String(percentage) + '%';
  }

  useEffect(() => {
    let secTimer = setInterval(() => {
      setPercentagePassed(getPercentagePassed());
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
