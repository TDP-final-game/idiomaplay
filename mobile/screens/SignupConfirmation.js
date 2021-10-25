import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../config/colors';
import { AntDesign } from '@expo/vector-icons';
import { PrimaryButton } from '../components/PrimaryButton';
import { commonStyles } from '../config/styles';

const SignupConfirmation = ({ navigation, route }) => {
  const { user } = route.params;
  console.log(user);

  const [givenName, setGivenName] = useState(user.givenName);
  const [familyName, setFamilyName] = useState(user.familyName);

  const confirmUser = () => {
    navigation.navigate('Home'); // todo: post a server
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
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
          source={{ uri: user.photoUrl }}
        >
          {/* <AntDesign name="google" size={40} color={colors.DARK_GRAY} /> */}
        </Image>

        <View style={{ marginTop: '5%' }}>
          <Text style={{ color: colors.PRIMARY_DARK, fontWeight: 'bold', fontSize: 18 }}>
            <AntDesign name="upload" size={25} color={colors.PRIMARY_DARK} />
            {'  Cargar nueva foto'}
          </Text>
        </View>
      </View>

      <View style={styles.inputsContainer}>
        <View style={{ height: '40%' }}>
          <Text style={styles.inputLabel}>Nombre</Text>
          <View style={[{ ...styles.input, height: '65%' }, commonStyles.shadow]}>
            <TextInput placeholder={'Nombre'} value={givenName} onChangeText={setGivenName} />
          </View>
        </View>

        <View style={{ height: '40%' }}>
          <Text style={styles.inputLabel}>Apellido</Text>
          <View style={[{ ...styles.input, height: '65%' }, commonStyles.shadow]}>
            <TextInput placeholder={'Apellido'} value={familyName} onChangeText={setFamilyName} />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton text={'Comenzar'} onPress={confirmUser} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: colors.BACKGROUND,
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

  inputsContainer: {
    flex: 0.3,
    justifyContent: 'space-evenly',
  },

  buttonContainer: {
    flex: 0.06,
    marginHorizontal: '25%',
  },

  inputLabel: {
    marginLeft: '7%',
    marginBottom: '1%',
    fontSize: 18,
    color: colors.PRIMARY_DARK,
  },

  input: {
    borderWidth: 3,
    borderRadius: 40,
    paddingLeft: '5%',
    justifyContent: 'center',
    marginHorizontal: '5%',
    borderColor: colors.DARK_GRAY,
    backgroundColor: colors.LIGHT_GRAY,
  },
});

export default SignupConfirmation;
