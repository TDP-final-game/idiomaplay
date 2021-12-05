import React, { useEffect } from 'react';
import { colors } from '../config/colors';
import { View, StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { screens } from '../config/screens';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { ChallengeCard } from '../components/ChallengeCard';
import challengeService from '../services/challengeService';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import TalkBalloon from 'react-native-talk-balloon';
import { useIsFocused } from '@react-navigation/core';
import { Dimensions } from 'react-native';

const Home = ({ navigation }) => {
  const [challengeAttempts, setChallengeAttempts] = useState([]);

  const user = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState('all');
  const [languageOptions, setLanguageOptions] = useState([
    { label: 'Todos los idiomas', value: 'all' },
    { label: 'Ingles', value: 'english' },
    { label: 'Español', value: 'spanish' },
    { label: 'Portugues', value: 'portuguese' },
  ]);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const isFocused = useIsFocused();

  const getChallenges = (value) => {
    challengeService.getChallenges(value).then((challenges) => {
      setChallengeAttempts(challenges);
    });
  };

  useEffect(() => {
    navigation.setOptions({
      cartButtonFunction: () => navigation.navigate(screens.MARKET),
    });

    getChallenges();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: '5%',
          flexDirection: 'row',
          flex: 0.3,
        }}
      >
        {/* <Button onPress={() => navigation.navigate(screens.TUTORIAL)} title={'hola'}></Button> */}

        <TalkBalloon
          backgroundColor={colors.BACKGROUND}
          borderColor={colors.DARK_LOGO}
          borderRadius={7}
          triangleSize={19}
          triangleDirection="right"
          triangleOffSet="30%"
          width={windowWidth * 0.52}
          borderWidth={8}
          height={windowWidth * 0.2}
        >
          <Text
            style={{
              marginBottom: '5%',
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.SECONDARY,
              textAlign: 'center',
            }}
          >
            {`Hola! ${user.name}, ¿Listo para nuevos desafíos?`}
          </Text>
        </TalkBalloon>
        <Ionicons name="logo-octocat" size={100} color={colors.DARK_LOGO} />
      </View>
      <View style={{ marginHorizontal: '5%', flex: 0.1 }}>
        <DropDownPicker
          open={open}
          value={language}
          items={languageOptions}
          setOpen={setOpen}
          setValue={setLanguage}
          onChangeValue={(value) => getChallenges(value)}
          setItems={setLanguageOptions}
          listMode={'SCROLLVIEW'}
          modalProps={{
            animationType: 'fade',
          }}
        />
      </View>
      <View style={{ flex: 0.5 }}>
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
