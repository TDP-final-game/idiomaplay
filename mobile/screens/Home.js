import React, { useEffect } from 'react';
import { colors } from '../config/colors';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { screens } from '../config/screens';
import { states } from '../config/states';
import { Ionicons } from '@expo/vector-icons';
import { ExamCard } from '../components/ExamCard';

import TalkBalloon from "react-native-talk-balloon";


const Home = ({ navigation }) => {

  const user = useSelector((state) => state.user);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: '5%', flexDirection: 'column' }}>
        <View style={{ marginHorizontal: '5%', flexDirection: 'row' }}>
          <TalkBalloon
              backgroundColor={colors.BACKGROUND}
              borderColor={colors.DARK_LOGO}
              borderRadius={7}
              triangleSize={19}
              triangleDirection="right"
              triangleOffSet="30%"
              width={150}
              borderWidth={8}
              height={150}
              >
                <Text style={ { marginBottom: '5%', fontSize: 18, fontWeight: 'bold', color: colors.SECONDARY, textAlign: 'center',}}>
                  {`Hola! ${user.name}, ¿Listo para nuevos desafíos?`}
                </Text>
            </TalkBalloon>
          <Ionicons name="logo-octocat" size={100} color={colors.DARK_LOGO} />
        </View>
        <Text style={ { marginBottom: '5%', fontSize: 18, fontWeight: 'bold'}}> Tus Desafíos: </Text>
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
