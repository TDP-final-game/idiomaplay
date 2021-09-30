import React from 'react';
import { colors } from '../config/colors';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { decrement, increment } from '../actions/countActions';
import { append, remove } from '../actions/concatActions';

const Home = ({ navigation }) => {
  const counter = useSelector((state) => state.counter.value);
  const string = useSelector((state) => state.concat.string);

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title={'Traducir frase al idioma nativo'}
          onPress={() => navigation.navigate('Excercise')}
        />
      </View>

      <View
        style={{
          backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <View style={{ width: '40%', justifyContent: 'center' }}>
          <Button title={'-'} onPress={() => dispatch(decrement())} />
        </View>

        <View style={{ backgroundColor: 'green' }}>
          <Text style={{ fontSize: 50 }}>{counter}</Text>
        </View>

        <View style={{ width: '40%', justifyContent: 'center' }}>
          <Button title={'+'} onPress={() => dispatch(increment())} />
        </View>
      </View>

      <View style={{ backgroundColor: 'green', alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>{string}</Text>
      </View>

      <View
        style={{
          backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <View style={{ width: '40%', justifyContent: 'center' }}>
          <Button title={'append "A"'} onPress={() => dispatch(append('a'))} />
        </View>

        <View style={{ width: '40%', justifyContent: 'center' }}>
          <Button title={'remove last'} onPress={() => dispatch(remove())} />
        </View>
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
