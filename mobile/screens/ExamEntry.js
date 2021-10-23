import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../config/colors';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '../components/PrimaryButton';
import { useSelector } from 'react-redux';

const ExamEntry = ({ navigation, route }) => {
  const unit = 1;
  const lesson = 1;

  const animatedIconSize = 100;
  const anim = new Animated.Value(2);

  const minimumPercentage = 0.8;
  const exerciseResults = useSelector((state) => state.lesson.exerciseResults);
  const countCorrectExercises = (results) => {
    return results.filter(item => item===true).length;
  }

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconName, setIconName] = useState("");

  useEffect(() => {
    const minimumCorrectResponses = Math.ceil(exerciseResults.length * minimumPercentage);
    if (countCorrectExercises(exerciseResults) < minimumCorrectResponses) {
      setTitle("¡Estuviste cerca!");
      setSubtitle("¡No bajes los brazos!");
      setDescription("¡Debes completar al menos un 80% de los ejercicios correctamente para completar la lección!");
      setIconName("arm-flex");
    } else {
      setTitle("¡Felicidades!");
      setSubtitle(`¡Lección ${lesson} finalizada con éxito!`);
      setDescription("");
      setIconName("party-popper");
    }
  }, [])

  const text = (
    <>
      {'Ir al examen '}
      <Ionicons name="ios-newspaper" size={20} color={colors.SECONDARY_LIGHT} />
    </>
  );

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
        { description !== "" &&
          (<View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>)
        }
        <View style={styles.buttonContainer}>
          <PrimaryButton text={text}></PrimaryButton>
        </View>
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
    flex: 0.30,
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  descriptionContainer: {
    flex: 0.30,
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
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },

  buttonContainer: {
    flex: 0.07,
    marginBottom: '3%',
    marginHorizontal: '10%',
    justifyContent: 'center',
  },
});

export default ExamEntry;
