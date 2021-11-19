import React, { useEffect } from 'react';
import { colors } from '../config/colors';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screens } from '../config/screens';
import { states } from '../config/states';
import { ExamCard } from '../components/ExamCard';

const Home = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      cartButtonFunction: () => navigation.navigate(screens.MARKET),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: '5%' }}>
        <ExamCard
          text={'Challenge 1'}
          state={states.inProgress}
          onPress={() => navigation.navigate(screens.UNITS_LIST)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.BACKGROUND,
  },

  buttonContainer: {
    marginHorizontal: '5%',
    justifyContent: 'center',
  },
});

export default Home;
