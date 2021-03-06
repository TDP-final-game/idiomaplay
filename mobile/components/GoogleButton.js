import React from 'react';
import { colors } from '../config/colors';
import { commonStyles } from '../config/styles';
import { TouchableOpacity } from 'react-native';
import { Text, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

export const GoogleButton = ({ logInMode, onSuccessCallback }) => {
  const logInText = 'Inicia sesion con Google';
  const signUpText = 'Registrate con Google';
  const text = logInMode ? logInText : signUpText;

  async function onGoogleButtonPress() {
    try {
      const { type, accessToken, user, idToken } = await Google.logInAsync({
        androidClientId:
          '587070144029-00cat8gv3r8u2s1kjq1c725svfnqh5pk.apps.googleusercontent.comrrr',
        behavior: 'web',
        scopes: ['profile', 'email'],
      });
      if (type === 'success') {
        // await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        // const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        // const token = await firebase.auth().currentUser.getIdToken(true)
        onSuccessCallback(user, accessToken);
      }
    } catch ({ message }) {
      console.log('GoogleError:' + message);
    }
  }

  return (
    <TouchableOpacity style={[styles.button, commonStyles.shadow]} onPress={onGoogleButtonPress}>
        <View style={styles.icon}>
          <AntDesign name="google" size={30} color={colors.PRIMARY_DARK} />
        </View>
        <View style={{ width: '75%' }}>
          <Text style={styles.text}>{text}</Text>
        </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: '5%',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '90%',
    backgroundColor: colors.LIGHT_GRAY,
  },
  icon: {
    width: '15%'
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.PRIMARY_DARK,
  },
});
