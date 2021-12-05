import React from 'react';
import { View } from 'react-native';
import { useRef, useState } from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from '../config/colors';
import Carousel from 'react-native-snap-carousel';
import { Pagination } from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screens } from '../config/screens';
import { TutorialCard } from '../components/TutorialCard';
import { PrimaryButton } from '../components/PrimaryButton';

import { TUTORIAL_IMAGE_1, TUTORIAL_IMAGE_2 } from '../config/images';

export const Tutorial = ({ navigation }) => {
  const refCar = useRef();

  const [paginationLessonIndex, setPaginationLessonIndex] = useState(0);

  const tutorialPages = [
    {
      index: 1,
      title: 'Bienvenido!',
      image: TUTORIAL_IMAGE_1,
    },
    {
      index: 2,
      title: 'Como jugar?',
      image: TUTORIAL_IMAGE_1,
    },
    {
      index: 3,
      title: 'Vidas y monedas',
      image: TUTORIAL_IMAGE_2,
    },
  ];

  const Paginador = () => {
    return (
      <Pagination
        dotsLength={3}
        activeDotIndex={paginationLessonIndex}
        containerStyle={{ backgroundColor: colors.BACKGROUND }}
        dotStyle={{
          width: 25,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: colors.PRIMARY,
        }}
        inactiveDotStyle={{ width: 10 }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeMessage}>Tutorial</Text>
      </View>

      <View style={{ flex: 0.7 }}>
        <Carousel
          ref={refCar}
          data={tutorialPages}
          onSnapToItem={setPaginationLessonIndex}
          layout="default"
          renderItem={({ item }) => (
            <View
              style={{ flexGrow: 1, backgroundColor: colors.BACKGROUND, marginHorizontal: '5%' }}
            >
              <TutorialCard text={item.title} image={item.image} />
            </View>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
        />
      </View>

      <View style={{ marginHorizontal: '5%', flex: 0.1 }}>
        <Paginador />
      </View>
      <View style={{ marginHorizontal: '5%', flex: 0.05 }}>
        <PrimaryButton
          text={'Finalizar'}
          disabled={paginationLessonIndex != 2}
          onPress={() => navigation.navigate(screens.HOME)}
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

  welcomeTextContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeMessage: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.PRIMARY_DARK,
  },
});
