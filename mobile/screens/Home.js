import React, { useEffect } from 'react';
import { colors } from '../config/colors';
import { View, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screens } from '../config/screens';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title={'Unidad 1'} onPress={() => navigation.navigate(screens.LESSON_LIST)} />
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

  tobparContainer: {
    flex: 0.15,
    backgroundColor: 'red',
  },
});

export default Home;
