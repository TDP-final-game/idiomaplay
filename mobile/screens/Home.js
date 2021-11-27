import React, { useEffect } from 'react';
import { colors } from '../config/colors';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screens } from '../config/screens';
import { FlatList } from 'react-native-gesture-handler';
import { ChallengeCard } from '../components/ChallengeCard';
import challengeService from '../services/challengeService';
import { useState } from 'react';

const Home = ({ navigation }) => {
  const [challengeAttempts, setChallengeAttempts] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      cartButtonFunction: () => navigation.navigate(screens.MARKET),
    });

    challengeService.getChallenges().then((challenges) => {
      setChallengeAttempts(challenges);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={challengeAttempts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: '5%', marginTop: '2%', marginBottom: '2%' }}>
            <ChallengeCard
              text={item.name}
              state={item.status}
              onPress={() =>
                navigation.navigate(screens.UNITS_LIST, {
                  challengeAttemptId: item._id,
                  challengeName: item.name,
                })
              }
            />
          </View>
        )}
      />
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
