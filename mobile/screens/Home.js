import React from 'react';
import { colors } from '../config/colors';
import { View, StyleSheet, Button, Image, Dimensions, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../config/styles';
import { useSelector } from 'react-redux';

const Home = ({ navigation }) => {
  const photoUrl = useSelector((state) => state.user.imageUrl);
  const name = useSelector((state) => state.user.name);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title={'Lesson list'} onPress={() => navigation.navigate('LessonsList')} />
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
