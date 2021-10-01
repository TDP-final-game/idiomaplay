import React, { useEffect, useState } from 'react';
import { colors } from '../config/colors';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getHealth } from '../redux/challenge';

const Home = ({ navigation }) => {
  const [string, setString] = useState('local string');
  const { healthy } = useSelector(state => state.challenge)

  const dispatch = useDispatch();

  useEffect(() => {
    const doStuff = async () => {
      const { payload } = await dispatch(getHealth());
      setString(payload)
    }
    setTimeout(doStuff, 2000)
  })

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
          <Button title={'-'} />
        </View>

        <View style={{ backgroundColor: 'green' }}>
          <Text style={{ fontSize: 50 }}>healthy: {String(healthy)}</Text>
        </View>

        <View style={{ width: '40%', justifyContent: 'center' }}>
          <Button title={'+'} />
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
          <Button title={'append "A"'} />
        </View>

        <View style={{ width: '40%', justifyContent: 'center' }}>
          <Button title={'remove last'}  />
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
