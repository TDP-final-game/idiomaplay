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
      <View style={styles.imageContainer}>
        <Image
          style={[
            {
              borderRadius:
                Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
              backgroundColor: colors.LIGHT_GRAY,
              borderColor: colors.DARK_GRAY,
              borderWidth: 3,
              width: Dimensions.get('window').width * 0.3,
              height: Dimensions.get('window').width * 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            },
            commonStyles.shadow,
          ]}
          source={{ uri: photoUrl }}
        ></Image>

        <View style={{ marginTop: '5%' }}>
          <Text style={{ color: colors.PRIMARY_DARK, fontWeight: 'bold', fontSize: 18 }}>
            {name}
          </Text>
        </View>
      </View>

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

  imageContainer: {
    flex: 0.3,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    backgroundColor: colors.PRIMARY,
    borderColor: colors.PRIMARY_DARK,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
