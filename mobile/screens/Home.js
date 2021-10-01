import React from 'react';
import { colors } from '../config/colors';
import { View, StyleSheet, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title={'Traducir frase al idioma nativo'}
          onPress={() => navigation.navigate('Excercise')}
        />
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
