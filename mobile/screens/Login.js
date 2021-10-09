import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '../components/PrimaryButton';
import { GoogleButton } from '../components/GoogleButton';

const Login = ({ navigation, route }) => {
  const iconSize = 200;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.textA}>Idioma Play</Text>
          <Ionicons name="logo-octocat" size={iconSize} color={'#fff'} />
          <Text style={styles.textB}>Aprende nuevo idiomas. Unete ahora mismo.</Text>
        </View>

        <View style={{ flex: 0.15, justifyContent: 'space-between' }}>
          <View style={styles.buttonContainer}>
            <GoogleButton text={'Registrarse con Google'} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión.</Text>
          </View>
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
    flex: 0.45,
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textA: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },

  textB: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonContainer: {
    height: '45%',
    marginHorizontal: '5%',
    justifyContent: 'center',
  },

  textContainer: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Login;
