import React from 'react';
import * as Speech from 'expo-speech';
import { Image, TouchableOpacity } from 'react-native';

export const AudioExercise = ({ sentence }) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => Speech.speak(sentence)}>
      <Image source={require('../assets/talk.png')} />
    </TouchableOpacity>
  );
};
