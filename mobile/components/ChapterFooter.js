import React, { useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import { colors } from '../config/colors';
import { PrimaryButton } from './PrimaryButton';

export const ChapterFooter = ({ showContinue, onContinue, isExam}) => {
  const initialHeight = 100;
  const bounceValue = new Animated.Value(initialHeight);

  const [footerHeight, setFooterHeight] = useState(initialHeight);
  const results = useSelector((state) => state.lesson.exerciseResults);

  // This will animate the transalteY of the subview
  // between 0 & 100 depending on its current state
  // 100 comes from the style below, which is the height
  // of the subview.
  Animated.spring(bounceValue, {
    useNativeDriver: true,
    toValue: showContinue ? 0 : footerHeight,
    velocity: 3,
    friction: 8,
    tension: 2,
  }).start();

  const resultIcon = {
    [true]: (key) => (
      <FontAwesome name="check-circle" size={30} color={colors.CORRECT_COLOR} key={key} />
    ),
    [false]: (key) => (
      <FontAwesome name="times-circle" size={30} color={colors.INCORRECT_COLOR} key={key} />
    ),
    ['current']: (key) => (
      <FontAwesome name="circle-o" size={30} color={colors.SECONDARY_LIGHT} key={key} />
    ),
    [null]: (key) => (
      <FontAwesome name="circle-o" size={30} color={colors.PRIMARY_DARK} key={key} />
    ),
  };

  const printCurrentResults = () => {
    const res = [...results];
    res[res.indexOf(null)] = 'current';
    return res.map((result, i) => resultIcon[result](i));
  };

  const updateHeight = (layout) => {
    const { height } = layout;
    setFooterHeight(height);
  };

  return (
    <View
      style={getStyles(isExam).footerContainer}
      onLayout={(event) => updateHeight(event.nativeEvent.layout)}
    >
      {printCurrentResults()}
      <Animated.View style={[getStyles(isExam).slider, { transform: [{ translateY: bounceValue }] }]}>
        <View style={getStyles(isExam).buttonContainer}>
          <PrimaryButton text={'Continuar'} onPress={onContinue} />
        </View>
      </Animated.View>
    </View>
  );
};

const getStyles = (isExam) => StyleSheet.create({
  footerContainer: {
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '10%',
    borderTopWidth: 3,
    justifyContent: 'space-evenly',
    backgroundColor: isExam ? colors.SECONDARY : colors.PRIMARY,
    borderTopColor: isExam ? colors.SECONDARY_DARK : colors.PRIMARY_DARK,
  },

  buttonContainer: {
    flexGrow: 0.4,
    marginHorizontal: '20%',
  },

  slider: {
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: colors.PRIMARY_DARK,
  },
});
