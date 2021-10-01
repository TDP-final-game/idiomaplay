import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Text, Button } from 'react-native';
import { colors } from '../config/colors';
import { FontAwesome } from '@expo/vector-icons';
import { AnswerButton } from './AnswerButton';
import { PrimaryButton } from './Button';

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

// list of { true, false, null }
export const ChapterFooter = ({ showContinue, onContinue }) => {
  const [bounceValue, _] = useState(new Animated.Value(100));

  // This will animate the transalteY of the subview
  // between 0 & 100 depending on its current state
  // 100 comes from the style below, which is the height
  // of the subview.
  Animated.spring(bounceValue, {
    useNativeDriver: true,
    toValue: showContinue ? 0 : 100,
    velocity: 3,
    friction: 8,
    tension: 2,
  }).start();


  const resultIcon = {
    correct: (key) => (
      <FontAwesome name="times-circle" size={30} color={colors.INCORRECT_COLOR} key={key} />
    ),
    incorrect: (key) => (
      <FontAwesome name="check-circle" size={30} color={colors.CORRECT_COLOR} key={key} />
    ),
    current: (key) => (
      <FontAwesome name="circle-o" size={30} color={colors.SECONDARY_LIGHT} key={key} />
    ),
    [null]: (key) => (
      <FontAwesome name="circle-o" size={30} color={colors.PRIMARY_DARK} key={key} />
    ),
  };

  const printCurrentResults = () => {
    const icons = [];

    questionResults.forEach((result, i) => {
      icons.push(resultIcon[result](i));
    });

    return icons;
  };

  return (
    <View style={styles.footerContainer}>
      {printCurrentResults()}
      <Animated.View style={[styles.slider, { transform: [{ translateY: bounceValue }] }]}>
        <View style={styles.buttonContainer}>
          <PrimaryButton text={'Continuar'} onPress={onContinue} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '10%',
    borderTopWidth: 3,
    backgroundColor: colors.PRIMARY,
    borderTopColor: colors.PRIMARY_DARK,
  },

  buttonContainer: {
    flexGrow: 0.4,
    marginHorizontal: '20%',
  },

  slider: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: colors.PRIMARY_DARK,
  },
});
