import * as React from 'react';
import { colors } from '../config/colors';
import { View, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title={'Ejercicio 1'} onPress={() => navigation.navigate('Excercise')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title={'Ejercicio 1'} disabled />
      </View>

      <View style={styles.buttonContainer}>
        <Button title={'Ejercicio 1'} disabled />
      </View>

      <View style={styles.buttonContainer}>
        <Button title={'Ejercicio 1'} disabled />
      </View>

      <View style={styles.buttonContainer}>
        <Button title={'Ejercicio 1'} disabled />
      </View>

      <View style={styles.buttonContainer}>
        <Button title={'Ejercicio 1'} disabled />
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
