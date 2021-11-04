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
import UnitsList from './screens/UnitsList'
import SignupConfirmation from './screens/SignupConfirmation';
import { useSelector } from 'react-redux';
import { firebaseConfig } from './config';
import { TopBar } from './components/TopBar';
import { screens } from './config/screens';
import { ChapterHeader, UnitHeader } from './components/ChapterHeader';

const Stack = createNativeStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const RootComponent = () => {
  const isLogged = useSelector((state) => state.user.logged);

  const header = {
    [screens.HOME]: () => <TopBar />,
    [screens.UNITS_LIST]: () => <TopBar />,
    [screens.LESSONS_LIST]: ({ unit, returnButtonFunction }) => (
      <UnitHeader unit={unit} returnButtonFunction={returnButtonFunction} />
    ),
    [screens.EXERCISE]: ({ returnButtonFunction, unit, lesson }) => (
      <ChapterHeader unit={unit} lesson={lesson} returnButtonFunction={returnButtonFunction} />
    ),
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLogged ? 'Home' : 'Login'}
        screenOptions={() => ({
          header: (props) =>
            isLogged &&
            header[props.route.name] && (
              <SafeAreaView style={{ flex: 0.15, marginTop: '7%' }}>
                {header[props.route.name](props.options)}
              </SafeAreaView>
            ),
        })}
      >
        {isLogged ? (
          <>
            <Stack.Screen name={screens.HOME} component={Home} />
            <Stack.Screen name="ExamEntry" component={ExamEntry} />
            <Stack.Screen name={screens.EXERCISE} component={Excercise} />
            <Stack.Screen name={screens.LESSONS_LIST} component={LessonsList} />
            <Stack.Screen name="SignupConfirmation" component={SignupConfirmation} />
            <Stack.Screen name={screens.UNITS_LIST} component={UnitsList} />
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
        <RootComponent />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
