import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import { colors } from '../config/colors';
import { PrimaryButton } from './PrimaryButton';

export const ChapterFooter = ({ showContinue, onContinue }) => {
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
    [true]: (key, size) => (
      <FontAwesome name="check-circle" size={size} color={colors.CORRECT_COLOR} key={key} />
    ),
    [false]: (key, size) => (
      <FontAwesome name="times-circle" size={size} color={colors.INCORRECT_COLOR} key={key} />
    ),
    ['current']: (key, size) => (
      <FontAwesome name="circle-o" size={size} color={colors.SECONDARY_LIGHT} key={key} />
    ),
    [null]: (key, size) => (
      <FontAwesome name="circle-o" size={size} color={colors.PRIMARY_DARK} key={key} />
    ),
  };

  const calcIconSize = () => {
    if (results.length <= 8) return 30;
    return 22;
  };

  const printCurrentResults = () => {
    const res = [...results];
    const iconSize = calcIconSize();
    res[res.indexOf(null)] = 'current';
    return res.map((result, i) => resultIcon[result](i, iconSize));
  };

  const updateHeight = (layout) => {
    const { height } = layout;
    setFooterHeight(height);
  };

  useEffect(() => {});

  return (
    <View
      style={styles.footerContainer}
      onLayout={(event) => updateHeight(event.nativeEvent.layout)}
    >
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
    borderTopWidth: 3,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '8%',
    justifyContent: 'space-evenly',
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
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: colors.PRIMARY_DARK,
  },
});
