
import React from 'react'
import * as Speech from 'expo-speech'
import { colors } from '../config/colors';
import { commonStyles } from '../config/styles';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export const AudioExercise = ({ sentence }) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => Speech.speak(sentence) }>
      <Image
        source={require('../assets/talk.png')}
      />
    </TouchableOpacity>
  );
};