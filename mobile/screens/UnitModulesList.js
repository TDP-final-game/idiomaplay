import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../config/colors';
import { LessonCard } from '../components/LessonCard';
import { useDispatch } from 'react-redux';
import UnitService from '../services/unitService';
import { initResults } from '../redux/lesson';
import { useIsFocused } from '@react-navigation/core';
import { screens } from '../config/screens';
import { moduleTypes } from '../config/constants';
import { ExamCard } from '../components/ExamCard';
import { states } from '../config/states';
import Carousel from 'react-native-snap-carousel';
import { Pagination } from 'react-native-snap-carousel';

const UnitModulesList = ({ navigation, route }) => {
  const [exam, setExam] = useState(null);
  const [lessonsAttempts, setLessonsAttempts] = useState([]);
  const [paginationLessonIndex, setPaginationLessonIndex] = useState(0);

  const isFocused = useIsFocused();
  const { unitOrderNumber, challengeAttemptId } = route.params;

  useEffect(() => {
    navigation.setOptions({
      unit: unitOrderNumber,
      returnButtonFunction: () => navigation.goBack(),
    });

    // todo: spinner while loading
    UnitService.getUnitModules(challengeAttemptId, unitOrderNumber).then((modules) => {
      setLessonsAttempts(modules.filter((module) => module.type === moduleTypes.LESSON));
      setExam(modules.find((module) => module.type === moduleTypes.EXAM));
    });
  }, [isFocused]);

  const dispatch = useDispatch();

  const handlePress = async (lessonOrderNumber) => {
    const exercisesAttempts = await UnitService.attemptUnitModule(
      challengeAttemptId,
      unitOrderNumber,
      lessonOrderNumber
    );

    if (exercisesAttempts.error === true) {
      Alert.alert(
        'Te faltan vidas!',
        'No tienes vidas suficientes para realizar este modulo! Completa los que esten en progreso para poder ganar vidas!',
        [{ text: 'OK' }]
      );
    }

    const isExam = lessonOrderNumber === -1;
    dispatch(initResults(exercisesAttempts));

    let exerciseParams = {
      lessonOrderNumber,
      exercisesAttempts,
      challengeAttemptId,
      isExam,
    };

    if (isExam) {
      exerciseParams['startingDate'] = exam.startingDate;
      exerciseParams['expirationDate'] = exam.expirationDate;
    }

    return navigation.navigate(screens.EXERCISE, exerciseParams);
  };

  const refCar = useRef();

  const pagination = () => {
    return (
      <Pagination
        dotsLength={lessonsAttempts.length}
        activeDotIndex={paginationLessonIndex}
        containerStyle={{ backgroundColor: colors.BACKGROUND }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: colors.PRIMARY,
        }}
        inactiveDotStyle={{}}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.6 }}>
        <Carousel
          ref={refCar}
          data={lessonsAttempts}
          onSnapToItem={setPaginationLessonIndex}
          layout="default"
          renderItem={({ item }) => (
            <View
              style={{ flexGrow: 1, marginHorizontal: '5%', backgroundColor: colors.BACKGROUND }}
            >
              <LessonCard
                text={item.name}
                state={item.status}
                disabled={item.blocked}
                onPress={() => handlePress(item.orderNumber)}
              />
            </View>
          )}
          sliderWidth={415}
          itemWidth={415}
        />
      </View>

      <View style={{ marginHorizontal: '5%', flex: 0.1 }}>{pagination()}</View>

      <View style={{ marginVertical: '5%', marginHorizontal: '5%', flex: 0.2 }}>
        <ExamCard
          text={exam?.name}
          state={exam?.status ?? states.pending}
          disabled={exam?.blocked}
          onPress={() => handlePress(exam?.orderNumber)}
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
});

export default UnitModulesList;
