import React, { useState, useEffect } from 'react';
import { screens } from '../config/screens';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../components/PrimaryButton';
import { useSelector, useDispatch } from 'react-redux';
import { SecondaryButton } from '../components/SecondaryButton';
import { CustomAlert } from '../components/CustomAlert';
import { resetResults } from '../redux/lesson';
import { LifeAndCoins } from '../components/LifeAndCoins';
import { initResults } from '../redux/lesson';
import UnitService from '../services/unitService';

const ExamEntry = ({ navigation, route }) => {
  const { challengeAttemptId, unitOrderNumber, lessonOrderNumber, rewards, isExam } = route.params;

  const NOT_ENOUGHT_LIVES_ALERT_BODY =
    'No tienes vidas suficientes para realizar este modulo! Completa los que esten en progreso para poder ganar vidas!';
  const NOT_ENOUGHT_LIVES_ALERT_TITLE = 'Te faltan vidas!';

  const lessonState = {
    RETRY: 'RETRY',
    GO_TO_EXAM: 'GO_TO_EXAM',
    RETURN_TO_UNIT: 'RETURN_TO_UNIT',
    RETURN_TO_CHALLENGE: 'RETURN_TO_CHALLENGE',
  };

  const dispatch = useDispatch();

  const animatedIconSize = 100;
  const anim = new Animated.Value(2);

  const minimumPercentage = 0.8;
  const exerciseResults = useSelector((state) => state.lesson.exerciseResults);

  const countCorrectExercises = (results) => {
    return results.filter((item) => item === true).length;
  };

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('');
  const [currentLessonState, setCurrentLessonState] = useState(null);
  const [showNotEnoughtLivesAlert, setshowNotEnoughtLivesAlert] = useState(false);

  const goToUnit = () => {
    dispatch(resetResults());
    return navigation.navigate(screens.UNIT_MODULES_LIST, {
      unitOrderNumber,
      challengeAttemptId,
    });
  };

  const goToChallenge = () => {
    dispatch(resetResults());
    return navigation.navigate(screens.UNITS_LIST, {
      unitOrderNumber,
      challengeAttemptId,
    });
  };

  const goToExam = async () => {
    const unitModuleAttempt = await UnitService.attemptUnitModule(
      challengeAttemptId,
      unitOrderNumber,
      -1
    );

    if (unitModuleAttempt.error === true) {
      setshowNotEnoughtLivesAlert(true);
      return;
    }

    dispatch(initResults(unitModuleAttempt.exercisesAttempts));

    let exerciseParams = {
      lessonOrderNumber: -1,
      exercisesAttempts: unitModuleAttempt.exercisesAttempts,
      challengeAttemptId,
      isExam: true,
      startingDate: unitModuleAttempt.startingDate,
      expirationDate: unitModuleAttempt.expirationDate,
    };

    return navigation.navigate(screens.EXERCISE, exerciseParams);
  };

  const retryLesson = async () => {
    dispatch(resetResults(isExam));

    const unitModuleAttempt = await UnitService.attemptUnitModule(
      challengeAttemptId,
      unitOrderNumber,
      lessonOrderNumber
    );

    // TODO: bug fixing when this happens
    if (unitModuleAttempt.error === true) {
      Alert.alert(
        'Te faltan vidas!',
        'No tienes vidas suficientes para realizar este modulo! Completa los que esten en progreso para poder ganar vidas!',
        [{ text: 'OK' }]
      );

      setshowNotEnoughtLivesAlert(true);

      return navigation.navigate(screens.UNIT_MODULES_LIST, {
        unitOrderNumber,
        challengeAttemptId,
      });
    }

    const exerciseParams = {
      lessonOrderNumber,
      exercisesAttempts: unitModuleAttempt.exercisesAttempts,
      challengeAttemptId,
      isExam,
    };

    if (isExam) {
      exerciseParams['startingDate'] = unitModuleAttempt.startingDate;
      exerciseParams['expirationDate'] = unitModuleAttempt.expirationDate;
    }

    return navigation.navigate(screens.EXERCISE, exerciseParams);
  };

  useEffect(() => {
    const minimumCorrectResponses = Math.ceil(exerciseResults.length * minimumPercentage);

    if (countCorrectExercises(exerciseResults) < minimumCorrectResponses) {
      setTitle('¡Estuviste cerca!');
      setSubtitle('¡No bajes los brazos!');
      setDescription(
        `¡Debes completar al menos un 80% de los ejercicios correctamente para completar ${
          isExam ? 'el examen' : 'la lección!'
        }`
      );
      setIconName('arm-flex');
      setCurrentLessonState(lessonState.RETRY);
    } else {
      setTitle('¡Felicidades!');
      setSubtitle(
        `¡${isExam ? 'Unidad' : 'Lección'} ${
          isExam ? unitOrderNumber : lessonOrderNumber
        } finalizada con éxito!`
      );
      setDescription('');
      setIconName('party-popper');

      if (!isExam) {
        UnitService.allLessonsPassed(challengeAttemptId, unitOrderNumber).then((allPassed) => {
          if (allPassed) setCurrentLessonState(lessonState.GO_TO_EXAM);
          else setCurrentLessonState(lessonState.RETURN_TO_UNIT);
        });
      } else {
        setCurrentLessonState(lessonState.RETURN_TO_CHALLENGE);
      }
    }
  }, []);

  Animated.loop(
    Animated.sequence([
      // increase size
      Animated.timing(anim, {
        toValue: 3,
        duration: 1000,
        useNativeDriver: true,
      }),

      // decrease size
      Animated.timing(anim, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <CustomAlert
        visible={showNotEnoughtLivesAlert}
        title={NOT_ENOUGHT_LIVES_ALERT_TITLE}
        body={NOT_ENOUGHT_LIVES_ALERT_BODY}
        primaryButtonText={'Continuar'}
        onPrimaryButtonPress={() => setshowNotEnoughtLivesAlert(false)}
      />

      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={styles.animationContainer}>
          <Animated.View style={{ transform: [{ scale: anim }] }}>
            <MaterialCommunityIcons
              name={iconName}
              size={animatedIconSize}
              color={colors.PRIMARY_LIGHT}
            />
          </Animated.View>
        </View>

        {description !== '' && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>
        )}

        <View style={{ marginHorizontal: '5%' }}>
          <LifeAndCoins
            coins={rewards.coins}
            lives={rewards.lives}
            earned={true}
            iconSize={50}
            fontSize={35}
          />
        </View>

        {currentLessonState === lessonState.RETURN_TO_UNIT && (
          <View style={{ ...styles.buttonContainer, flex: 0.07 }}>
            <PrimaryButton text={'Ir a unidad'} onPress={goToUnit}></PrimaryButton>
          </View>
        )}

        {currentLessonState === lessonState.RETURN_TO_CHALLENGE && (
          <View style={{ ...styles.buttonContainer, flex: 0.07 }}>
            <PrimaryButton text={'Ir al desafio'} onPress={goToChallenge}></PrimaryButton>
          </View>
        )}

        {currentLessonState === lessonState.GO_TO_EXAM && (
          <View style={{ ...styles.buttonContainer, flex: 0.17, justifyContent: 'space-between' }}>
            <View style={{ flexGrow: 0.45 }}>
              <PrimaryButton text={'Realizar examen'} onPress={goToExam}></PrimaryButton>
            </View>

            <View style={{ flexGrow: 0.45, width: '75%', alignSelf: 'center' }}>
              <SecondaryButton text={'Ir a Unidad'} onPress={goToUnit}></SecondaryButton>
            </View>
          </View>
        )}

        {currentLessonState === lessonState.RETRY && (
          <View style={{ ...styles.buttonContainer, flex: 0.17, justifyContent: 'space-between' }}>
            <View style={{ flexGrow: 0.45 }}>
              <PrimaryButton text={'Reintentar'} onPress={retryLesson}></PrimaryButton>
            </View>

            <View style={{ flexGrow: 0.45, width: '75%', alignSelf: 'center' }}>
              <SecondaryButton text={'Ir a Unidad'} onPress={goToUnit}></SecondaryButton>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY_DARK,
  },

  container: {
    flex: 1,
    borderWidth: 20,
    borderRadius: 40,
    justifyContent: 'space-evenly',
    backgroundColor: colors.PRIMARY,
    borderColor: colors.PRIMARY_DARK,
  },

  messageContainer: {
    flex: 0.3,
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  descriptionContainer: {
    flex: 0.25,
    marginBottom: '3%',
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  animationContainer: {
    flex: 0.25,
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  title: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  description: {
    fontSize: 27,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },

  buttonContainer: {
    marginBottom: '3%',
    marginHorizontal: '10%',
    justifyContent: 'center',
  },
});

export default ExamEntry;
