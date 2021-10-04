import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../config/colors';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '../components/PrimaryButton';

const ExamEntry = ({ navigation, route }) => {
  const unit = 1;
  const lesson = 1;

  const animatedIconSize = 100;
  const anim = new Animated.Value(2);

  const text = (
    <>
      {'Ir al examen '}
      <Ionicons name="ios-newspaper" size={20} color={colors.SECONDARY_LIGHT} />
    </>
  );

  Animated.loop(
    Animated.sequence([
      // increase size
      Animated.timing(anim, {
        toValue: 3,
        duration: 1000,
        useNativeDriver: true,
      }),

      // decrease size
      Animated.timing(anim, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.textA}>Felicidades!</Text>
          <Text style={styles.textB}>Lección {lesson} finalizada con éxito!</Text>
        </View>

        <View style={styles.animationContainer}>
          <Animated.View style={{ transform: [{ scale: anim }] }}>
            <MaterialCommunityIcons
              name="party-popper"
              size={animatedIconSize}
              color={colors.PRIMARY_LIGHT}
            />
          </Animated.View>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton text={text}></PrimaryButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_DARK,
  },

  container: {
    flex: 1,
    borderWidth: 20,
    borderRadius: 40,
    justifyContent: 'space-evenly',
    backgroundColor: colors.PRIMARY,
    borderColor: colors.PRIMARY_DARK,
  },

  messageContainer: {
    flex: 0.45,

    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  animationContainer: {
    flex: 0.35,
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  textA: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },

  textB: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonContainer: {
    flex: 0.07,
    marginHorizontal: '10%',
    justifyContent: 'center',
  },
});

export default ExamEntry;
