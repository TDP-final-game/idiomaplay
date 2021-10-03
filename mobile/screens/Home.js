import React, { useEffect, useState } from 'react';
import { colors } from '../config/colors';
import { View, StyleSheet, Button, Text, TouchableHighlight, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getHealth } from '../redux/challenge';

const Home = ({ navigation }) => {
  const [string, setString] = useState('local string');
  const { healthy } = useSelector((state) => state.challenge);

  const dispatch = useDispatch();

  useEffect(() => {
    const doStuff = async () => {
      const { payload } = await dispatch(getHealth());
      setString(payload);
    };
    setTimeout(doStuff, 2000);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title={'Traducir frase al idioma nativo'}
          onPress={() => navigation.navigate('Excercise')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title={'Exam entry'} onPress={() => navigation.navigate('ExamEntry')} />
      </View>

      <Text>{string}</Text>
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
