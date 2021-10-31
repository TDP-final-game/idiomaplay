import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import store from './redux/store';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import firebase from 'firebase';
import Home from './screens/Home';
import Login from './screens/Login';
import Excercise from './screens/Excercise';
import ExamEntry from './screens/ExamEntry';
import LessonsList from './screens/LessonsList';
import SignupConfirmation from './screens/SignupConfirmation';
import { useSelector } from 'react-redux';
import { firebaseConfig } from './config';
import { TopBar } from './components/TopBar';

const Stack = createNativeStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const RootComponent = () => {
  const isLogged = useSelector((state) => state.user.logged);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLogged ? 'Home' : 'Login'}
        screenOptions={() => ({
          header: () =>
            isLogged && (
              <SafeAreaView style={{ flex: 0.15, marginTop: '7%' }}>
                <TopBar />
              </SafeAreaView>
            ),
        })}
      >
        {isLogged ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ExamEntry" component={ExamEntry} />
            <Stack.Screen name="Excercise" component={Excercise} />
            <Stack.Screen name="LessonsList" component={LessonsList} />
            <Stack.Screen name="SignupConfirmation" component={SignupConfirmation} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignupConfirmation" component={SignupConfirmation} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootComponent></RootComponent>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
