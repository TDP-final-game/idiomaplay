import React, { useState } from 'react';
import { colors } from '../config/colors';
import { View, StyleSheet, Button, Text, TouchableHighlight, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = ({ navigation }) => {
  const [isHidden, setHidden] = useState(true);
  const [buttonText, setButtonText] = useState('Show Subview');
  const [bounceValue, setBounceValue] = useState(new Animated.Value(100));

  const _toggleSubview = () => {
    setButtonText(!isHidden ? 'Show Subview' : 'Hide Subview');

    var toValue = 100;
    if (isHidden) toValue = 0;

    // This will animate the transalteY of the subview
    // between 0 & 100 depending on its current state
    // 100 comes from the style below, which is the height
    // of the subview.
    Animated.spring(bounceValue, {
      useNativeDriver: true,
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
    }).start();

    setHidden(!isHidden);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title={'Traducir frase al idioma nativo'}
          onPress={() => navigation.navigate('Excercise')}
        />
      </View>

      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          _toggleSubview();
        }}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableHighlight>
      <Animated.View style={[styles.subView, { transform: [{ translateY: bounceValue }] }]}>
        <Text>This is a sub view</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: colors.BACKGROUND,
  },

  buttonContainer: {
    flex: 0.07,
    marginHorizontal: '5%',
    justifyContent: 'center',
  },

  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 17,
    color: '#007AFF',
  },
  subView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    height: 100,
  },
});

export default Home;
