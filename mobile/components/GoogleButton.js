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
      const { type, accessToken, user } = await Google.logInAsync({
        clientId: '587070144029-00cat8gv3r8u2s1kjq1c725svfnqh5pk.apps.googleusercontent.com',
        behavior: 'web',
        scopes: ['profile', 'email'],
      });
      if (type === 'success') {
        onSuccessCallback(user, accessToken);
        // await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        // console.log(await firebase.auth());
        // const currentUser = await firebase.auth().currentUser;
        // console.log(currentUser);
        // const token = currentUser.getIdToken(true)
      }
    } catch (e) {
      console.log('GoogleError:', e);
    }
  }

  return (
    <TouchableOpacity style={[styles.button, commonStyles.shadow]} onPress={onGoogleButtonPress}>
      <View style={styles.textContainer}>
        <View style={{ width: '15%' }}>
          <AntDesign name="google" size={30} color={colors.PRIMARY_DARK} />
        </View>
        <View style={{ width: '70%' }}>
          <Text style={styles.text}>{text}</Text>
        </View>
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
    backgroundColor: colors.LIGHT_GRAY,
  },

  textContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.PRIMARY_DARK,
  },
});
