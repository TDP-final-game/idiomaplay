import * as React from 'react';
import { colors } from '../config/colors';
import { View, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  translateToNativeMock,
  translateToForeignMock,
  completeSentenceMock,
} from '../config/mocks';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title={'Traducir frase al idioma nativo'}
          onPress={() => navigation.navigate('Excercise', translateToNativeMock)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={'Traducir frase al idioma extrangero'}
          onPress={() => navigation.navigate('Excercise', translateToForeignMock)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={'Completar frase'}
          onPress={() => navigation.navigate('Excercise', completeSentenceMock)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title={'Coming soon'} disabled />
      </View>

      <View style={styles.buttonContainer}>
        <Button title={'Coming soon'} disabled />
      </View>

      <View style={styles.buttonContainer}>
        <Button title={'Coming soon'} disabled />
      </View>
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
});

export default Home;
