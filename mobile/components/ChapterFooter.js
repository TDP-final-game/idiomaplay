import React, { useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import { colors } from '../config/colors';
import { PrimaryButton } from './Button';

export const ChapterFooter = ({ showContinue, onContinue }) => {
  const initialHeight = 100;

  const [h, setH] = useState(initialHeight);
  const results = useSelector((state) => state.challenge.exerciseResults);
  const [bounceValue, setBounceValue] = useState(new Animated.Value(initialHeight));

  // This will animate the transalteY of the subview
  // between 0 & 100 depending on its current state
  // 100 comes from the style below, which is the height
  // of the subview.
  Animated.spring(bounceValue, {
    useNativeDriver: true,
    toValue: showContinue ? 0 : h,
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
    setH(height);
    console.log('H setted to ', height);
  };

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
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '10%',
    borderTopWidth: 3,
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
