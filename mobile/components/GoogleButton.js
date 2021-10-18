import React, { useState } from 'react';
import { colors } from '../config/colors';
import { commonStyles } from '../config/styles';
import { TouchableOpacity } from 'react-native';
import { Text, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';



export const GoogleButton = ({ text, onPress }) => {

  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();




  GoogleSignin.configure({
    webClientId: '609841862106-cq46nsquv42gpdg6sg3901beo26j32fc.apps.googleusercontent.com',
  });

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    console.log(idToken, "MAGUI COMETE ESTA")
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
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
