import React, { useEffect } from 'react';
import { colors } from '../config/colors';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screens } from '../config/screens';
import { FlatList } from 'react-native-gesture-handler';
import { states } from '../config/states';
import { ChallengeCard } from '../components/ChallengeCard';
import challengeService from '../services/challengeService';
import { useState } from 'react';

const Home = ({ navigation }) => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      cartButtonFunction: () => navigation.navigate(screens.MARKET),
    });

    challengeService.getChallenges().then((challenges) => {
      setChallenges(challenges);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={challenges}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: '5%', marginTop: '2%', marginBottom: '2%' }}>
            <ChallengeCard
              text={item.name}
              state={states.pending}
              onPress={() => navigation.navigate(screens.UNITS_LIST)}
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
