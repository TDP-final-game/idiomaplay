import React, { useState } from 'react';
import { colors } from '../config/colors';
import { commonStyles } from '../config/styles';
import { TouchableOpacity } from 'react-native';
import { Text, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';





export const GoogleButton = ({ text, onPress }) => {



  async function onGoogleButtonPress() {
    try {
      const signInData = await Google.logInAsync({
        androidClientId: '587070144029-00cat8gv3r8u2s1kjq1c725svfnqh5pk.apps.googleusercontent.comrrr',
        behavior: 'web',
        scopes: ['profile', 'email']
      });
      if (signInData.type  === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(signInData.idToken, signInData.accessToken);
        console.log(credential)
        const userData = await firebase.auth().signInWithCredential(credential);
        const token = await firebase.auth().currentUser.getIdToken(true)
        // dispatch(actionsCreator.setUser(parseFirebaseResponse(userData)));
        // const firebaseToken = await firebase.auth().currentUser.getIdToken(true);
        console.log('Token to use:', token)        // firebase.auth().createUserWithEmailAndPassword(email, password);
        // // dispatch(actionsCreator.setUser(parseFirebaseResponse(userData)));
        // const firebaseToken = await firebase.auth().currentUser.getIdToken(true);
        // console.log(firebaseToken)
        // dispatch(actionsCreator.setFirebaseToken(firebaseToken));
        // navigation.navigate(BASE_ROUTES.FIREBASE_LOADING.name);
      }
    } catch ({ message }) {
      console.log('GoogleError:' + message);
    }
  }



  return (
    <TouchableOpacity style={[styles.button, commonStyles.shadow]} onPress={onGoogleButtonPress}>
      <View style={styles.textContainer}>
        <View style={{ width: '15%' }}>
          <AntDesign name="google" size={30} color={colors.PRIMARY_DARK} />
        </View>
        <View style={{ width: '70%' }}>
          <Text style={styles.text}>{'registrarse con Google'}</Text>
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
