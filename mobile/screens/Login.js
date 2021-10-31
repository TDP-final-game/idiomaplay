import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/user';
import { GoogleButton } from '../components/GoogleButton';
import UserService from '../services/userService';

const Login = ({ navigation, route }) => {
  const iconSize = 200;

  const logInText = '¿Ya tienes cuenta? Inicia sesión.';
  const signUpText = '¿No tienes cuenta? Registrate.';

  const [logInMode, setLogInMode] = useState(false);
  const [text, setText] = useState(logInText);

  const dispatch = useDispatch();

  const changeLogInMode = () => {
    const nextMode = !logInMode;
    setLogInMode(nextMode);
    setText(nextMode ? signUpText : logInText);
  };

  const onSuccessCallback = (user, accessToken) => {
    if (!logInMode) {
      UserService.logIn(user.email /*va el access token*/).then((data) => {

        if(data.id){
          Alert.alert('Usuario ya registrado!', 'Utilice otra cuenta de google!', [
            { text: 'OK'},
          ]);
        } else {
          return navigation.navigate('SignupConfirmation', { user });
        }
      });
    } else {
      UserService.logIn(user.email /*va el access token*/).then((data) => {

        if(!data.id){
          Alert.alert('Usuario no esta registrado!', 'Registrese para poder acceder a IdiomaPlay!', [
            { text: 'OK'},
          ]);
        }
        dispatch(
          logIn({
            email: user.email,
            userId: data.id,
            imageUrl: user.photoUrl,
            name: data.firstName + ' ' + data.lastName,
          })
        );
        return navigation.navigate('Home');
      });
    }
  };

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
            <GoogleButton onSuccessCallback={onSuccessCallback} logInMode={logInMode} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.loginText} onPress={changeLogInMode}>
              {text}
            </Text>
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
